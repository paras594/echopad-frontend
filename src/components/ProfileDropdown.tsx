"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSocket } from "@/contexts/socket-context";

const ProfileDropdown = ({ name }: any) => {
  const { socket } = useSocket();
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/set-token", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (socket) {
        socket.disconnect();
      }

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <details className="dropdown dropdown-end">
      <summary tabIndex={0} role="button" className="flex gap-2 items-center">
        <div className="avatar placeholder">
          <div className="bg-primary text-white border-2 border-accent w-9 md:w-10 rounded-full">
            <span className="text-lg md:text-xl capitalize">
              {name?.[0] || "?"}
            </span>
          </div>
        </div>
        <span className="prose text-primary hidden md:inline font-semibold">
          {name}
        </span>
      </summary>
      <div
        tabIndex={0}
        className="mt-3 z-[99] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <p className="text-lg p-4">{name}</p>
        <button onClick={() => logout()} className="btn btn-block btn-primary">
          Logout
        </button>
      </div>
    </details>
  );
};

export default ProfileDropdown;
