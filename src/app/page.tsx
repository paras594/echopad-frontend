import ClientSideState from "@/components/ClientSideState";
import TextEditor from "@/components/TextEditor";
import useStore from "@/lib/useStore";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Home() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const email = cookieStore.get("email")?.value;
  const name = cookieStore.get("name")?.value;

  // const setIsLoggedIn = useStore((state: any) => state.setIsLoggedIn);
  // const setUser = useStore((state: any) => state.setUser);

  // if (jwt) {
  //   console.log("setting state");
  //   useStore.setState({
  //     isLoggedIn: true,
  //     name: name,
  //     email: email,
  //   });
  // }

  return (
    <>
      <ClientSideState
        state={{
          isLoggedIn: jwt ? true : false,
          name: name,
          email: email,
        }}
      />
      <section className="min-h-full grid relative">
        <div className="grid overflow-y-scroll">
          <TextEditor session={jwt} email={email} />
        </div>
      </section>
    </>
  );
}
