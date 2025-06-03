import dynamic from "next/dynamic";
import Link from "next/link";
import { PiFiles } from "react-icons/pi";
import TextEditor from "@/components/text-editor/TextEditor";
const InstallPWAFloatingBtn = dynamic(
  () => import("@/components/InstallPWAFloatingBtn"),
);

export default async function Home() {
  return (
    <section className="grid relative" style={{ height: "calc(100vh - 72px)" }}>
      <div className="grid overflow-y-scroll">
        <TextEditor />
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
