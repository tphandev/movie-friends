import { BASE_URL } from "@/utilis/constant";
import { Movie } from "@/utilis/types";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import tmdbLogo from "@/public/tmdb.svg";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";

export default function MovieSlide({
  id,
  backdrop_path,
  poster_path,
  title,
  name,
  original_name,
  vote_average,
  overview,
}: Movie) {
  return (
    <div className="flex flex-col space-y-2 h-[95vh] py-16 md:space-y-4 lg:pb-12 lg:mf-grid">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10 ">
        <ImageWithFallback
          src={`${BASE_URL}/original${backdrop_path || poster_path}`}
          alt={title || name || original_name!}
          fill
          className="object-cover object-center"
        />
        <div className="absolute w-full h-[95vh] bg-gradient-to-r from-black to-transparent bottom-0 z-20" />
        <div className="absolute w-full h-14 bg-gradient-to-t from-[#141414] to-transparent bottom-0 z-20" />
      </div>
      <div className="space-y-5 relative top-60 md:top-80 lg:top-24 lg:col-span-12 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold">
          {title || name || original_name}
        </h1>
        {vote_average !== 0 && (
          <div className="flex justify-start gap-4 items-center cursor-pointer">
            <Image
              className="relative"
              src={tmdbLogo}
              alt="TMDB Logo"
              width={136}
              height={17}
            />
            <p className="font-bold text-lg">
              {Math.floor(vote_average * 10) / 10}
            </p>
          </div>
        )}
        <p className="max-w-xs text-shadow-md text-sm md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
          {overview}
        </p>
        <button className="btn-primary">
          <Link href={`/movie/${id}`} className="flex gap-3 items-center">
            <PlayIcon className="h-5" />
            WATCH NOW
          </Link>
        </button>
      </div>
    </div>
  );
}
