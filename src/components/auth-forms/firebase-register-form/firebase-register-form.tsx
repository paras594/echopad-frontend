"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import InputErrorLabel from "@/components/auth-forms/InputErrorLabel";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/configs/firebase-config";
import { validateRegister } from "@/utils/validators";
import { firebaseAuthErrors } from "@/utils/firebase-auth-errors";
import FormSubmitBtn from "../FormSubmitBtn";

const FirebaseRegisterForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {} as any,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = state;

    setLoading(true);

    const errors = validateRegister(name, email, password, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setState((values) => ({ ...values, errors }));
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth?.currentUser as any, {
        displayName: name,
      });
      router.replace("/");
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
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
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
          onChange={handleChange}
          required
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
          onChange={handleChange}
          required
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
          onChange={handleChange}
          required
          placeholder="Confirm Password"
          className="input input-bordered w-full max-w-sm"
        />
        {state?.errors?.confirmPassword && (
          <InputErrorLabel errorMsg={state.errors.confirmPassword} />
        )}
      </div>

      <FormSubmitBtn isSubmitting={loading}>
        {loading ? "Registering..." : "Register"}
      </FormSubmitBtn>

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

export default FirebaseRegisterForm;
