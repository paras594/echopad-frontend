"use client";
import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";
import { getServerAuthSession } from "@/lib/authOptions";
import { RiArrowLeftLine } from "react-icons/ri";
import { useSession } from "next-auth/react";

const loggedIn = false;

const SecondaryNavbar = () => {
  const { data: authSession, status } = useSession();

  return (
    <div className="navbar border-b">
      <div className="flex-1 md:ml-4">
        <Link href="/" className="btn btn-square btn-ghost text-2xl">
          <RiArrowLeftLine />
        </Link>
      </div>
      {status === "loading" ? (
        <span className="loading loading-spinner text-gray-300 loading-md mr-2 md:mr-4"></span>
      ) : (
        <div className="flex-none gap-2 mr-2 md:mr-4">
          {authSession?.user ? (
            <div className="flex gap-4 md:gap-6 items-center">
              <ConnectedDevicesCount />
              <ProfileDropdown name={authSession?.user?.name} />
            </div>
          ) : (
            <Link href="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SecondaryNavbar;
