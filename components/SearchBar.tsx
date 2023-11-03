"use client";
import { useState } from "react";
import Autocomplete from "./Autocomplete";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function SearchBar() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <button onClick={() => setIsShow(!isShow)}>
        <MagnifyingGlassIcon
          className={clsx("md:hidden h-6 w-6 text-gray-400", {
            "text-white": isShow,
          })}
          aria-hidden="true"
        />
      </button>
      <div
        className={clsx(
          "absolute h-12 md:h-10 w-[90vw] top-20 md:top-0 md:relative md:flex-1 max-w-sm md:block",
          { hidden: !isShow }
        )}
      >
        <Autocomplete onSelect={() => setIsShow(false)} />
      </div>
    </>
  );
}
