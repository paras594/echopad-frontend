"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import InputErrorLabel from "@/components/InputErrorLabel";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {} as any,
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await signIn("credentials", {
      email: state.email,
      password: state.password,
      callbackUrl: "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={state.email}
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
          onChange={handleChange}
          value={state.password}
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
