import Card from "@/components/Card";
import { getUpcomingMovies } from "@/utilis/api";
import { BASE_URL } from "@/utilis/constant";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { format, parseISO } from "date-fns";
import Link from "next/link";

async function getData(page: number) {
  return getUpcomingMovies(page);
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const upcomingMovies = await getData(page);

  return (
    <main className="mt-24 lg:mt-28">
      <section className="lg:mf-grid  lg:px-0">
        <div className="lg:col-span-12 flex items-end justify-between px-2 pb-2 lg:pb-0 lg:px-0">
          <h1 className="font-bold text-3xl lg:text-5xl">Upcoming Movies</h1>
          <div className="flex gap-4 md:gap-8">
            {page > 1 && (
              <Link
                href={{ pathname: "/upcoming", query: { page: page - 1 } }}
                className="mf-link flex gap-2 items-center"
              >
                <ChevronLeftIcon className="h-8 w-8" />
                <p className="hidden md:flex">Previous</p>
              </Link>
            )}
            <Link
              href={{ pathname: "/upcoming", query: { page: page + 1 } }}
              className="mf-link flex gap-2 items-center"
            >
              <p className="hidden md:flex">Next</p>

              <ChevronRightIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-10 p-2 lg:p-0">
          {upcomingMovies.map(
            ({
              id,
              poster_path,
              title,
              name,
              original_name,
              vote_average,
              release_date,
            }) => (
              <Card
                key={id}
                href={`/movie/${id}`}
                imageSrc={`${BASE_URL}/w300${poster_path}`}
                title={title || name || original_name!}
                subTitle={
                  release_date
                    ? format(parseISO(release_date), "yyyy")
                    : undefined
                }
                tmdbVote={Math.floor(vote_average * 10) / 10}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}
