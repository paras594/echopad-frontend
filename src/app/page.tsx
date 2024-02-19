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
import { Suspense } from "react";

export default async function Home() {
  const authSession = await getServerAuthSession();

  let content = "";

  if (authSession) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/user-content`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          authorization: `Bearer ${authSession?.user?.access_token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log({
        errorOccured: data,
      });
    }
    console.log({ data });
    content = data.userContent.content;
  }

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
        <TextEditor2 content={content} />
      </div>
    </section>
  );
}
