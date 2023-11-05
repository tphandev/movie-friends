"use client";
import clsx from "clsx";
import { signOut } from "next-auth/react";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <button
      title="Logout"
      className={clsx("text-red-500", className)}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Log out
    </button>
  );
}
