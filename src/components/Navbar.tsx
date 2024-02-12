import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import { cookies } from "next/headers";
import ConnectedDevicesCount from "@/components/ConnectedDevicesCount";

const loggedIn = false;

const Navbar = async () => {
  const cookieStore = cookies();
  const name = cookieStore.get("name")?.value;
  const email = cookieStore.get("email")?.value;
  const jwt = cookieStore.get("jwt")?.value;

  console.log({ name, email, jwt });

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn gap-0 btn-ghost text-xl text-white">
          <span className="text-accent">Echo</span>
          <span className="text-accent"></span>Pad
        </Link>
      </div>
      <div className="flex-none gap-2 mr-4">
        {jwt ? (
          <div className="flex gap-2 md:gap-4 items-center">
            <ConnectedDevicesCount />
            <ProfileDropdown name={name} />
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
