"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import TextInput from "./TextInput";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const validationSchema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm({
  providers = [],
}: {
  providers?: { id: string; name: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit = async ({ email, password }: FormValues) => {
    const loginData = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (loginData?.error) {
      setError("Invalid credentials");
    } else {
      router.push(callbackUrl || "/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {providers.map(({ id, name }) => (
        <button
          key={name}
          onClick={() => signIn(id, { callbackUrl: callbackUrl || "/" })}
          className="border-2 p-2 rounded-md w-full hover:bg-gray-200"
        >
          Sign in with {name}
        </button>
      ))}
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <TextInput name={"email"} label={"Email"} type="email" />
          <TextInput name={"password"} label={"Password"} type="password" />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
          >
            {methods.formState.isSubmitting ? (
              <div className="spinner border-white" />
            ) : (
              "Log In"
            )}
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don&apos;t have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
