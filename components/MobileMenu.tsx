"use client";

import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MobileMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <Popover className="lg:hidden">
      <Popover.Button className="outline-none">
        <span className="sr-only">Open menu</span>
        <Bars3Icon
          aria-hidden="true"
          className="text-white fill-white h-8 w-8"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute top-0 left-0 w-full bg-white">
          {({ close }) => (
            <div className="shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex h-screen flex-col gap-6 p-4">
                <div className="flex h-10 items-center justify-between">
                  <Link
                    href={"/"}
                    aria-label="Go to homepage"
                    onClick={() => close()}
                  >
                    <p className="font-bold text-3xl text-black select-none cursor-pointer">
                      Movie<span className="text-red-500">Friends</span>
                    </p>
                  </Link>
                  <Popover.Button className="outline-none">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon
                      className="text-black fill-black h-10 w-10"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
                <div className="flex max-w-sm flex-col gap-4 text-lg">
                  <Link
                    href={"/"}
                    onClick={() => close()}
                    className={clsx({
                      "text-red-500": pathname === "/",
                    })}
                  >
                    Home
                  </Link>

                  <Link
                    title="Popular Movies"
                    href={"/popular"}
                    onClick={() => close()}
                    className={clsx("text-black", {
                      "text-red-500": pathname === "/popular",
                    })}
                  >
                    Popular Movies
                  </Link>
                  <Link
                    title="Upcoming Movies"
                    href={"/upcoming"}
                    onClick={() => close()}
                    className={clsx("text-black", {
                      " text-red-500": pathname === "/upcoming",
                    })}
                  >
                    Upcoming Movies
                  </Link>
                  {session ? (
                    <Link
                      title="Logout"
                      href={"/api/auth/signout"}
                      className="text-red-500"
                    >
                      Log out
                    </Link>
                  ) : (
                    <Link
                      title="Login"
                      href={"/api/auth/signin"}
                      className="text-red-500"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
