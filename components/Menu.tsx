"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-16">
      <Link
        href={{ pathname: "/" }}
        title="Homepage"
        aria-label="Go to homepage"
      >
        <p className="font-bold text-2xl lg:text-3xl text-white select-none cursor-pointer">
          Movie<span className="text-red-500">Friends</span>
        </p>
      </Link>
      <div
        className={clsx(
          "hidden items-center justify-between gap-12 text-white lg:flex"
        )}
      >
        <Link
          title="Popular Movies"
          href={"/popular"}
          className={clsx(
            "transition-colors duration-300 hover:text-red-500 text-lg",
            { " text-red-500": pathname === "/popular" }
          )}
        >
          Popular Movies
        </Link>
        <Link
          title="Upcoming Movies"
          href={"/upcoming"}
          className={clsx(
            "transition-colors duration-300 hover:text-red-500 text-lg",
            { " text-red-500": pathname === "/upcoming" }
          )}
        >
          Upcoming Movies
        </Link>
      </div>
    </div>
  );
}
