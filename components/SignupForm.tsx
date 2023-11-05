"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "./TextInput";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { createUser } from "@/utilis/api";
import { signIn } from "next-auth/react";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

function SignupForm() {
  const [error, setError] = useState<string>();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await createUser(data);
      setError("");
      signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-4 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Sign Up</h2>
        <TextInput name="name" label="Name" type="text" />
        <TextInput name="email" label="Email" type="email" />
        <TextInput name="password" label="Password" type="password" />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center"
        >
          {methods.formState.isSubmitting ? (
            <div className="spinner border-white" />
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you already have account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/login">
            Log in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}

export default SignupForm;
