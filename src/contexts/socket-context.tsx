"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const auth = getAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketInitializer = async (user: User) => {
    if (!process.env.NEXT_PUBLIC_SOCKET_V1_URL) return;
    const email = user?.email;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_V1_URL, { email } as any);

    socket?.emit("register-user", { email });

    setSocket(socket);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        socketInitializer(user);
      }
    });
    return () => {
      if (socket) socket.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
