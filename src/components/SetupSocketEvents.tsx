"use client";

import { useSocket } from "@/contexts/socket-context";
import useStore from "@/lib/useStore";
import { useEffect } from "react";

const SetupSocketEvents = () => {
  const { socket } = useSocket();
  const setRoomCount = useStore((state) => state.setRoomCount);

  useEffect(() => {
    if (!socket) return;

    socket.on("user-joined-room", (data: any) => {
      setRoomCount(data.roomCount);
    });

    socket.on("user-left-room", (data: any) => {
      setRoomCount(data.roomCount);
    });
  }, [socket]);

  return null;
};

export default SetupSocketEvents;
