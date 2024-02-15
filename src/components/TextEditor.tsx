"use client";

import useStore from "@/lib/useStore";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import io from "socket.io-client";
import CustomToolbar from "@/components/CustomToolbar";

let socket: any;

const TextEditor = () => {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const setRoomCount = useStore((state: any) => state.setRoomCount);

  const socketInitializer = async () => {
    if (!process.env.NEXT_PUBLIC_SOCKET_V1_URL) return;
    const email = session?.user?.email;
    socket = io(process.env.NEXT_PUBLIC_SOCKET_V1_URL, { email } as any);

    socket?.emit("register-user", { email });

    socket.on("user-joined-room", (data: any) => {
      setRoomCount(data.roomCount);

      if (!input) return;

      socket.emit("input-change", {
        text: input,
        email,
        senderid: socket.id,
      });
    });

    socket.on("user-left-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("input-change", (data: any) => {
      setInput(data.text);
    });
  };

  useEffect(() => {
    if (session) socketInitializer();

    return () => {
      socket?.close();
    };
  }, [session]);

  const onChangeHandler = (e: any) => {
    const value = e.target.innerHTML;

    if (!socket) return;
    socket.emit("input-change", {
      text: value,
      email: session?.user?.email,
      senderid: socket.id,
    });
  };

  function insertLink() {
    const cursorPosition = this.quill.getSelection()?.index;
    if (!cursorPosition) return;
    this.quill.insertText(cursorPosition, "★");
    this.quill.setSelection(cursorPosition + 1);
  }

  return (
    <div
      className="text-editor"
      style={{
        minHeight: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={input}
        onKeyUp={onChangeHandler}
        modules={{
          toolbar: {
            container: "#toolbar",
            handlers: {
              insertLink: insertLink,
            },
          },
          clipboard: {
            matchVisual: false,
          },
        }}
        placeholder="Write something..."
        // modules={{
        //   toolbar: [
        //     [{ header: [1, 2, 3, false] }],
        //     ["bold", "italic", "underline"],
        //     [{ list: "ordered" }],
        //     ["link", "code-block"],
        //   ],
        // }}
      />
    </div>
  );
};

export default TextEditor;
