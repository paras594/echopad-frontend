"use client";

import React, { useState } from "react";
import InputErrorLabel from "../InputErrorLabel";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/configs/firebase-config";
import { validateLogin } from "@/utils/validators";
import { firebaseAuthErrors } from "@/utils/firebase-auth-errors";

const FirebaseLoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {} as any,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = state;

    const errors = validateLogin(email, password);

    if (Object.keys(errors).length > 0) {
      setState((values) => ({ ...values, errors }));
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log({ res });
      if (res?.user) {
        sessionStorage.setItem("user", "true");
        window.location.href = "/";
      } else {
        console.log(res);
        setLoading(false);
      }
    } catch (error: any) {
      if (error.code in firebaseAuthErrors) {
        setState((values) => ({
          ...values,
          errors: {
            error:
              firebaseAuthErrors[error.code as keyof typeof firebaseAuthErrors],
          },
        }));
      } else {
        setState((values) => ({
          ...values,
          errors: {
            error: "Something went wrong. Please try again.",
          },
        }));
      }
      setLoading(false);
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
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
          required
          value={state.password}
          className="input input-bordered w-full"
        />
        {state?.errors?.password && (
          <InputErrorLabel errorMsg={state.errors.password} />
        )}
      </div>
      {loading ? (
        <button type="button" className="btn btn-secondary">
          <span className="loading loading-spinner"></span>
          Logging In
        </button>
      ) : (
        <button className="btn btn-secondary">Login</button>
      )}
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

export default FirebaseLoginForm;
