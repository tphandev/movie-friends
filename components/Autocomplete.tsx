"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchCard from "./SearchCard";
import { searchMovies } from "@/utilis/api";
import { Movie } from "@/utilis/types";
import { format, parseISO } from "date-fns";
import { BASE_URL } from "@/utilis/constant";
import { useRouter } from "next/navigation";

export default function Autocomplete({
  onSelect,
}: {
  onSelect?: (value: number) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchSearchData = async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    try {
      const searchData = await searchMovies(query);
      setMovies(searchData);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchData(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (selectedMovieId) {
      setQuery("");
      router.push(`/movie/${selectedMovieId}`);
    }
  }, [router, selectedMovieId]);

  const onChange = (value: number) => {
    onSelect?.(value);
    setSelectedMovieId(value);
  };

  return (
    <Combobox value={selectedMovieId} onChange={onChange}>
      {({ open }) => (
        <div className="flex flex-col h-full  relative">
          <div className="relative h-full">
            <Combobox.Input
              value={query}
              className="rounded-2xl h-full w-full border-0 px-4 focus:border-0 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
          {open && query && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                static
                className={
                  "absolute p-4 w-full rounded-md top-16 lg:top-12 bg-white overflow-auto max-h-[70vh]"
                }
              >
                {movies.length === 0 && query !== "" && !isLoading ? (
                  <div className="relative cursor-default select-none text-gray-700">
                    Nothing found
                  </div>
                ) : (
                  movies.map(
                    ({
                      id,
                      poster_path,
                      title,
                      name,
                      original_name,
                      release_date,
                    }) => (
                      <Combobox.Option key={id} value={id}>
                        <SearchCard
                          imageSrc={`${BASE_URL}/w92${poster_path}`}
                          title={title || name || original_name!}
                          subTitle={
                            release_date
                              ? format(parseISO(release_date), "yyyy")
                              : undefined
                          }
                          className="py-1 cursor-pointer"
                        />
                      </Combobox.Option>
                    )
                  )
                )}
              </Combobox.Options>
            </Transition>
          )}
        </div>
      )}
    </Combobox>
  );
}
