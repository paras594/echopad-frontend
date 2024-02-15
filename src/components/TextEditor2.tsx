"use client";

import useStore from "@/lib/useStore";
import { useEditor, EditorContent, markPasteRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import io from "socket.io-client";
import Toolbar from "@/components/Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

let socket: any;

const TextEditor2 = () => {
  const { data: session } = useSession();
  const setRoomCount = useStore((state: any) => state.setRoomCount);

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
    onUpdate: ({ editor }) => {
      if (!session) return;
      // if (editorIsEmpty) return;
      socket.emit("input-change", {
        text: editor?.getHTML(),
        email: session?.user?.email,
        senderid: socket.id,
      });
    },
  });

  const socketInitializer = async () => {
    if (!process.env.NEXT_PUBLIC_SOCKET_V1_URL) return;
    const email = session?.user?.email;
    socket = io(process.env.NEXT_PUBLIC_SOCKET_V1_URL, { email } as any);

    socket?.emit("register-user", { email });

    socket.on("user-joined-room", (data: any) => {
      setRoomCount(data.roomCount);

      const editorIsEmpty = !editor?.state?.doc?.textContent?.trim()?.length;

      if (editorIsEmpty) return;

      socket.emit("input-change", {
        text: editor?.getHTML(),
        email,
        senderid: socket.id,
      });
    });

    socket.on("user-left-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("input-change", (data: any) => {
      editor?.commands?.setContent(data.text);
    });
  };

  useEffect(() => {
    if (session) socketInitializer();

    return () => {
      socket?.close();
    };
  }, [session]);

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-full grid [&>div]:outline-none px-3 py-2"
      />
    </div>
  );
};

export default TextEditor2;
