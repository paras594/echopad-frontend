"use client";

import useStore from "@/lib/useStore";
import { useEditor, EditorContent, markPasteRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";
import Toolbar from "@/components/text-editor/Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import debounce from "lodash.debounce";
import { useAuth } from "@/contexts/auth-context";
import { getAuth, getIdToken, signOut } from "firebase/auth";
import { useSocket } from "@/contexts/socket-context";

const TextEditor2 = ({ userContent }: { userContent: string }) => {
  const auth = getAuth();
  const { user } = useAuth();
  const { socket } = useSocket();
  const setIsUpdatingUserContent = useStore(
    (state) => state.setIsUpdatingUserContent,
  );

  const editor = useEditor({
    content: userContent,
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder:
          "Login your ID in different devices and sync your content across all of them",
      }),
      Link.extend({
        inclusive: false,
        addPasteRules() {
          return [
            markPasteRule({
              find: RegExp("/https?://[^s]+/", "g"),
              type: this.type,
            }),
          ];
        },
      }),
    ],
    autofocus: true,
    editable: true,
    onUpdate: () => {
      if (!user || !socket) return;

      handleContentChange();
    },
  });

  async function updateContent(content: any) {
    if (!user) return;
    setIsUpdatingUserContent(true);

    try {
      const idToken = await getIdToken(user);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        if (data.message === "Unauthorized") {
          await signOut(auth);
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsUpdatingUserContent(false);
    }
  }

  const debouncedUpdateContent = useCallback(debounce(updateContent, 1500), [
    user,
  ]);

  useEffect(() => {
    if (!socket || !editor) return;
    socket.on("input-change", (data: any) => {
      console.log("hello world", data);
      editor?.commands?.setContent(data.text);
    });
  }, [socket, editor]);

  function handleContentChange() {
    if (!user || !socket) return;
    socket.emit("input-change", {
      text: editor?.getHTML(),
      email: user?.email,
      senderid: socket.id,
    });

    debouncedUpdateContent(editor?.getHTML());
  }

  return (
    <div>
      <div className="sticky top-0 bg-white z-[10]">
        <Toolbar editor={editor} handleContentChange={handleContentChange} />
      </div>
      <EditorContent
        editor={editor}
        className="min-h-full grid [&>div]:outline-none px-3 py-2"
      />
    </div>
  );
};

export default TextEditor2;
