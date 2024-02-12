"use server";
import cookieParser from "set-cookie-parser";
import { cookies } from "next/headers";

export const loginUser: any = async (currentState: any, formData: any) => {
  "use server";

  const { email, password } = Object.fromEntries(formData);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_API_V1_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        cache: "no-cache",
      }
    );

    const data = await res.json();

    console.log({ data });

    if (!res.ok) {
      return { errors: { error: data.message } };
    }

    const resCookies = cookieParser.parse(res.headers.get("set-cookie") as any);

    resCookies.forEach((cookie: any) => {
      cookies().set(cookie);
    });
    cookies().set("name", data.user.name);
    cookies().set("email", data.user.email);

    return { success: true };
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return {
      errors: {
        error: "Something went wrong",
      },
    };
  }
};
