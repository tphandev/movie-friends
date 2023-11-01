"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav
      className={
        "lg:mf-grid top-0 p-4 transition-all duration-300 md:px-8 lg:bg-transparent xl:px-0 fixed z-20 w-full"
      }
    >
      <div className="flex justify-between lg:col-span-12">
        <div className="flex items-center justify-between gap-16">
          <Link
            href={{ pathname: "/" }}
            title="Homepage"
            aria-label="Go to homepage"
          >
            <p className="font-bold text-3xl text-white select-none cursor-pointer">
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

        <div className="flex items-center justify-between gap-8">
          <Link
            title="Login"
            className={
              "hidden text-white transition-colors duration-300 hover:text-red-500 lg:inline-block text-lg"
            }
            href={"/"}
          >
            Log in
          </Link>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}
