import dynamic from "next/dynamic";
const TextEditor2 = dynamic(() => import("@/components/TextEditor2"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-1/2 flex items-center justify-center">
      <span className="loading loading-spinner scale-150 text-primary"></span>
    </div>
  ),
});
import { getServerAuthSession } from "@/lib/authOptions";
import Link from "next/link";
import { PiFiles } from "react-icons/pi";
const InstallPWAFloatingBtn = dynamic(
  () => import("@/components/InstallPWAFloatingBtn"),
  {
    ssr: false,
  }
);

export default async function Home() {
  const authSession = await getServerAuthSession();

  //   if (!res.ok) {
  //     console.log({
  //       errorOccured: data,
  //     });
  //   }
  //   console.log({ data });
  //   content = data.userContent.content;
  // }

  // console.log({ authSession });
  /*
  authSession = {
    "name":"Paras Arora",
    "email":"parasarora594@gmail.com",
    "id":"parasarora594@gmail.com",
    "access_token": "jwt token"
  }

  */

  return (
    <section className="grid relative" style={{ height: "calc(100vh - 72px)" }}>
      <div className="grid overflow-y-scroll">
        <TextEditor2 key={Date.now()} />
      </div>
      <div className="fixed flex flex-col gap-4 items-center bottom-4 right-4 md:right-6">
        <InstallPWAFloatingBtn />
        <Link
          href="/files"
          className="btn btn-circle w-14 h-14 md:btn-lg btn-primary !text-2xl"
        >
          <PiFiles />
        </Link>
      </div>
    </section>
  );
}
