"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import InputErrorLabel from "@/components/InputErrorLabel";
import { loginUser } from "@/actions/login-user";

const LoginForm = () => {
  const [state, formAction] = useFormState<any>(loginUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {state?.errors?.email && (
          <InputErrorLabel errorMsg={state.errors.email} />
        )}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {state?.errors?.password && (
          <InputErrorLabel errorMsg={state.errors.password} />
        )}
      </div>
      <button className="btn btn-secondary">Login</button>
      {state?.errors?.error && (
        <div role="alert" className="alert bg-red-100 border border-red-200">
          <HiOutlineExclamationTriangle className="text-xl" />
          <span>{state.errors.error}</span>
        </div>
      )}
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <Link className="link" href="/register">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
