import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";
import { getServerAuthSession } from "@/lib/authOptions";
import Image from "next/image";

const loggedIn = false;

const Navbar = async () => {
  const authSession = await getServerAuthSession();

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
    </div>
  );
};

export default Navbar;
