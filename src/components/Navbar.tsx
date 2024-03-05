"use client";

import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";
import { getServerAuthSession } from "@/lib/authOptions";
import Image from "next/image";
import useUpdatingContentStore from "@/lib/useUpdatingContentStore";
import ContentUpdatingIndicator from "./ContentUpdatingIndicator";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SecondaryNavbar from "./SecondaryNavbar";
import { PiDownload } from "react-icons/pi";
import useInstallPWA from "@/hooks/use-install-pwa";

const loggedIn = false;

const Navbar = () => {
  // const authSession = await getServerAuthSession();
  const { data: authSession, status } = useSession();
  const pathname = usePathname();
  const { handleInstallClick, isInstalled } = useInstallPWA();

  if (pathname === "/files") {
    return <SecondaryNavbar />;
  }

  return (
    <div className="navbar border-b">
      <div className="flex-1 ml-2 md:ml-4">
        <Link
          href="/"
          className="gap-0 relative block w-[72px] h-10 md:w-20 md:h-12"
        >
          <Image src="/echopad-logo.svg" alt="echopad" fill />
        </Link>
      </div>
      <div></div>
      {status === "loading" ? (
        <span className="loading loading-spinner text-gray-300 loading-md mr-2 md:mr-4"></span>
      ) : (
        <div className="flex-none gap-2 mr-2 md:mr-4">
          <div className="flex gap-4 md:gap-4 items-center">
            {authSession?.user && <ContentUpdatingIndicator />}
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="btn btn-outline btn-sm btn-ghost hidden md:flex"
              >
                <span className="text-xl">
                  <PiDownload />
                </span>
                Install
              </button>
            )}
            {authSession?.user && (
              <>
                <ConnectedDevicesCount />
                <ProfileDropdown name={authSession?.user?.name} />
              </>
            )}
          </div>
          {!authSession?.user && (
            <Link href="/login" className="btn ml-4">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
