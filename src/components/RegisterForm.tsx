"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import InputErrorLabel from "@/components/InputErrorLabel";
import { registerUser } from "@/actions/register-user";

const RegisterForm = () => {
  const [state, formAction] = useFormState<any>(registerUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  console.log({ state });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full max-w-sm"
        />
        {state?.errors?.name && (
          <InputErrorLabel errorMsg={state.errors.name} />
        )}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-sm"
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
          className="input input-bordered w-full max-w-sm"
        />
        {state?.errors?.password && (
          <InputErrorLabel errorMsg={state.errors.password} />
        )}
      </div>
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered w-full max-w-sm"
        />
        {state?.errors?.confirmPassword && (
          <InputErrorLabel errorMsg={state.errors.confirmPassword} />
        )}
      </div>
      <button className="btn btn-secondary" type="submit">
        Register
      </button>
      {state?.errors?.error && (
        <div role="alert" className="alert bg-red-100 border border-red-200">
          <HiOutlineExclamationTriangle className="text-xl" />
          <span>{state.errors.error}</span>
        </div>
      )}
      <div className="text-center mt-4">
        Already have an account?{" "}
        <Link className="link" href="/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
