"use client";
import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";
import { RiArrowLeftLine } from "react-icons/ri";
import { useAuth } from "@/contexts/auth-context";

const loggedIn = false;

const SecondaryNavbar = () => {
  const { user, loading } = useAuth();

  return (
    <div className="navbar border-b">
      <div className="flex-1 md:ml-4">
        <Link href="/" className="btn btn-square btn-ghost text-2xl">
          <RiArrowLeftLine />
        </Link>
      </div>
      {loading ? (
        <span className="loading loading-spinner text-gray-300 loading-md mr-2 md:mr-4"></span>
      ) : (
        <div className="flex-none gap-2 mr-2 md:mr-4">
          {user ? (
            <div className="flex gap-4 md:gap-6 items-center">
              <ConnectedDevicesCount />
              <ProfileDropdown name={user.displayName} />
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
