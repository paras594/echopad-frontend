"use client";
import React from "react";
import { signOut } from "next-auth/react";

// const logout = async () => {
//   "use server";
//   const cookieStore = cookies();
//   cookieStore.delete("jwt");
//   cookieStore.delete("name");
//   cookieStore.delete("email");
//   revalidatePath("/");
// };

const ProfileDropdown = ({ name }: any) => {
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} role="button" className="flex gap-2 items-center">
        <div className="avatar placeholder">
          <div className="bg-primary text-white border-2 border-accent w-9 md:w-10 rounded-full">
            <span className="text-lg md:text-xl">{name[0] || "?"}</span>
          </div>
        </div>
        <span className="prose text-primary hidden md:inline font-semibold">
          {name}
        </span>
      </button>
      <div
        tabIndex={0}
        className="mt-3 z-[99] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <p className="text-lg p-4">{name}</p>
        <button onClick={() => signOut()} className="btn btn-block btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
