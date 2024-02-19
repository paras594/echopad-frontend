"use client";

import useStore from "@/lib/useStore";
import { useEditor, EditorContent, markPasteRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import io from "socket.io-client";
import Toolbar from "@/components/Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import debounce from "lodash.debounce";
import useUpdatingContentStore from "@/lib/useUpdatingContentStore";

let socket: any;

const TextEditor2 = () => {
  const { data: session } = useSession();
  const setRoomCount = useStore((state: any) => state.setRoomCount);
  const { setIsUpdating } = useUpdatingContentStore((state: any) => state);

  console.log({ session });

  const updateContent = async (content: any) => {
    // @ts-ignore
    if (!session?.user?.access_token) return;
    setIsUpdating(true);
    console.log({ session });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            authorization: `Bearer ${session?.user?.access_token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log({
          errorOccured: data,
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsUpdating(false);
    }
  };

  const debouncedUpdateContent = useCallback(debounce(updateContent, 1500), [
    // @ts-ignore
    session?.user?.access_token,
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
      if (!session) return;
      // if (editorIsEmpty) return;
      socket.emit("input-change", {
        text: editor?.getHTML(),
        email: session?.user?.email,
        senderid: socket.id,
      });

      debouncedUpdateContent(editor?.getHTML());
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

      // socket.emit("input-change", {
      //   text: editor?.getHTML(),
      //   email,
      //   senderid: socket.id,
      // });
    });

    socket.on("user-left-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("input-change", (data: any) => {
      editor?.commands?.setContent(data.text);
    });
  };

  const fetchUserContent = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            authorization: `Bearer ${authSession?.user?.access_token}`,
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
    }
  };

  useEffect(() => {
    if (session) {
      socketInitializer();
      fetchUserContent();
    }

    return () => {
      socket?.close();
    };
  }, [session]);

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

export default TextEditor2;
