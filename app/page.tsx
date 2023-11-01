import Hero from "@/components/Hero";
import MoviesRow from "@/components/MoviesRow";
import NavBar from "@/components/NavBar";
import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/utilis/api";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getData() {
  return Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getUpcomingMovies(),
  ]);
}

export default async function Page() {
  const [trendingMovies, popularMovies, upcomingMovies] = await getData();

  return (
    <>
      <Hero movies={trendingMovies} />
      <main className="mt-10 lg:mt-20">
        <section className="lg:mf-grid">
          <div className="lg:col-span-12 flex items-center justify-between px-2 lg:px-0">
            <h1 className="font-bold text-2xl ">Popular Movies</h1>
            <Link href={"/popular"} className="mf-link flex gap-2 items-center">
              <p className="inline">See more</p>
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="lg:col-span-12 p-2 lg:p-0">
            <MoviesRow movies={popularMovies} />
          </div>
        </section>
        <section className="lg:mf-grid mt-10 lg:mt-20">
          <div className="lg:col-span-12 flex items-center justify-between px-2 lg:px-0">
            <h1 className="font-bold text-2xl ">Upcoming Movies</h1>
            <Link href={"/popular"} className="mf-link flex gap-2 items-center">
              <p className="inline">See more</p>
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="lg:col-span-12 p-2 lg:p-0">
            <MoviesRow movies={upcomingMovies} />
          </div>
        </section>
      </main>
    </>
  );
}
