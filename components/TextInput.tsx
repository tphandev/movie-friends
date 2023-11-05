"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useState } from "react";
import {
  FieldError,
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
}

function TextInput({ name, label, type = "text", ...rest }: TextInputProps) {
  const { field } = useController({
    name,
  } as UseControllerProps);

  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : type}
          {...field}
          className={clsx(
            "mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-gray-500",
            { "border-red-500": !!error }
          )}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
}

export default TextInput;
