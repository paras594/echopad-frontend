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
        <TextEditor2 />
      </div>
    </section>
  );
}
