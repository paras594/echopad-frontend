import React from "react";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";

const logout = async () => {
  "use server";
  const cookieStore = cookies();
  cookieStore.delete("jwt");
  cookieStore.delete("name");
  cookieStore.delete("email");
  revalidatePath("/");
};

const ProfileDropdown = ({ name }: any) => {
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} role="button" className="btn btn-ghost">
        <div className="avatar placeholder">
          <div className="bg-white text-primary border-2 border-accent w-10 rounded-full">
            <span className="text-xl">{name[0] || "?"}</span>
          </div>
        </div>
        <span className="prose text-white hidden md:inline">{name}</span>
      </button>
      <div
        tabIndex={0}
        className="mt-3 z-[99] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <p className="text-lg p-4">{name}</p>
        <form action={logout} className="w-full">
          <button className="btn btn-block bg-red-50">Logout</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDropdown;
