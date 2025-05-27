"use client";

import useStore from "@/lib/useStore";
import { useEditor, EditorContent, markPasteRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import io from "socket.io-client";
import Toolbar from "@/components/Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import debounce from "lodash.debounce";
import useUpdatingContentStore from "@/lib/useUpdatingContentStore";
import { useAuth } from "@/contexts/auth-context";

let socket: any;

const MainEditor = () => {
  const { user, loading } = useAuth();
  const setRoomCount = useStore((state: any) => state.setRoomCount);
  const { setIsUpdating } = useUpdatingContentStore((state: any) => state);

  const updateContent = async (content: any) => {};

  const debouncedUpdateContent = useCallback(debounce(updateContent, 1500), [
    user,
  ]);

  const editor = useEditor({
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
    // onCreate: ({ editor }) => {

    // },
    onUpdate: ({ editor }) => {
      if (!user) return;

      debouncedUpdateContent(editor?.getHTML());
    },
  });

  const socketInitializer = async () => {};

  const fetchUserContent = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log({
          errorOccured: data,
        });
      } else {
        editor?.commands?.setContent(data.userContent.content);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (user && editor) {
      socketInitializer();
      fetchUserContent();
    }

    return () => {
      socket?.close();
    };
  }, [user, editor]);

  return (
    <div>
      <div className="sticky top-0 bg-white z-[10]">
        <Toolbar editor={editor} />
      </div>
      <EditorContent
        editor={editor}
        className="min-h-full grid [&>div]:outline-none px-3 py-2"
      />
    </div>
  );
};

export default MainEditor;
