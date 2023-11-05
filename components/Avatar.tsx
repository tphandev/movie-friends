"use client";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex gap-4 items-center">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        {session.user?.image ? (
          <ImageWithFallback
            src={session.user?.image}
            alt={session.user?.name || "User Avatar"}
            fill
            className="w-8"
          />
        ) : (
          <ImageWithFallback
            src={"https://i.pravatar.cc/300"}
            alt={session.user?.name || "User Avatar"}
            fill
            className="w-8"
          />
        )}
      </div>
      <LogoutButton className="mf-link text-white hidden lg:inline-block " />
    </div>
  ) : (
    <Link
      title="Login"
      className={"hidden lg:inline-block btn-primary"}
      href={"/api/auth/signin"}
    >
      Log in
    </Link>
  );
}
