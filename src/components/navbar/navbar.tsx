"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PiDownload } from "react-icons/pi";
import ProfileDropdown from "@/components/ProfileDropdown";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";
import useInstallPWA from "@/hooks/use-install-pwa";
import { useAuth } from "@/contexts/auth-context";
import ContentUpdatingIndicator from "../ContentUpdatingIndicator";
import { RiArrowLeftLine } from "react-icons/ri";

const Navbar = () => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const { handleInstallClick, isInstalled } = useInstallPWA();

  const isFilesPage = pathname === "/files";
  const isLoginPage = pathname === "/login";
  const isHomePage = pathname === "/";

  return (
    <div className="navbar border-b">
      <div className="flex-1 ml-2 md:ml-4">
        {isFilesPage ? (
          <Link href="/" className="btn btn-square btn-ghost text-2xl">
            <RiArrowLeftLine />
          </Link>
        ) : (
          <Link
            href="/"
            className="gap-0 relative block w-[72px] h-10 md:w-20 md:h-12"
          >
            <Image src="/echopad-logo.svg" alt="echopad" fill />
          </Link>
        )}
      </div>
      <div></div>
      <div className="flex-none gap-2 mr-2 md:mr-4">
        <div className="flex gap-4 md:gap-4 items-center">
          {!loading && user && isHomePage && <ContentUpdatingIndicator />}
          {!isFilesPage && !isInstalled && (
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
          <>
            {loading && !user ? (
              <div className="flex items-center gap-1 mr-2 md:mr-4">
                <div className="skeleton h-8 w-8"></div>
                <div className="skeleton h-8 w-8 rounded-lg"></div>
              </div>
            ) : (
              <ConnectedDevicesCount />
            )}
            {loading && !user ? (
              <div className="flex items-center gap-2">
                <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            ) : (
              user && <ProfileDropdown name={user.displayName} />
            )}
          </>
        </div>
        {!loading && !user && (
          <Link
            href={isLoginPage ? "/register" : "/login"}
            className="btn ml-4"
          >
            {isLoginPage ? "Register" : "Login"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
