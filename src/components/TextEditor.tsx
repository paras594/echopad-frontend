"use client";
import useStore from "@/lib/useStore";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import io from "socket.io-client";
let socket: any;

type Props = {
  session?: string;
  email?: string;
  // text: string;
  // onChange: (text: string) => void;
};

const TextEditor = ({ session, email }: Props) => {
  const [input, setInput] = useState("");
  const setRoomCount = useStore((state: any) => state.setRoomCount);
  const isLoggedIn = useStore((state: any) => state.isLoggedIn);
  console.log({ isLoggedIn });

  const socketInitializer = async () => {
    if (!process.env.NEXT_PUBLIC_SOCKET_V1_URL) return;
    socket = io(process.env.NEXT_PUBLIC_SOCKET_V1_URL, {
      email,
    } as any);

    socket?.emit("register-user", { email });

    socket.on("user-joined-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("user-left-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("input-change", (data: any) => {
      if (data.senderid === socket.id) return;
      console.log(
        "updating here state",
        data,
        socket.id,
        socket.handshake.query.id
      );
      setInput(data.text);
    });
  };

  useEffect(() => {
    if (isLoggedIn) socketInitializer();

    return () => {
      socket?.close();
    };
  }, [session, isLoggedIn]);

  const onChangeHandler = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    console.log({ content, delta, source, editor });
    setInput(editor.getContents());
    if (!socket) return;
    socket.emit("input-change", {
      text: editor.getContents(),
      email,
      senderid: socket.id,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactQuill
        style={{ minHeight: "100%" }}
        theme="snow"
        value={input}
        onChange={onChangeHandler}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline"],
            ["code-block"],
          ],
        }}
      />
    </Suspense>
  );
};

export default TextEditor;
