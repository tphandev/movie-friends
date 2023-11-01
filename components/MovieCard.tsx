import { BASE_URL } from "@/utilis/constant";
import { Movie } from "@/utilis/types";
import { format, parseISO } from "date-fns";
import Image from "next/image";

export default function MovieCard({
  poster_path,
  title,
  name,
  original_name,
  vote_average,
  release_date,
}: Movie) {
  return (
    <div>
      <div className="relative w-full h-72 md:h-80 lg:h-96">
        <Image
          src={`${BASE_URL}/${poster_path}`}
          alt={title || name || original_name!}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 20vw, 10vw"
        />
      </div>
      <div className="">
        <p className="text-gray-900  lg:text-lg font-bold mt-3  ">
          {title || name || original_name!}
        </p>
        {!!vote_average && (
          <div className="flex justify-start gap-2 items-center cursor-pointer mt-2 mb-1">
            <Image
              className="relative"
              src="/tmdb.svg"
              alt="TMDB Logo"
              width={100}
              height={17}
            />
            <p className="font-bold text-md ">
              {Math.floor(vote_average * 10) / 10}
            </p>
          </div>
        )}
        {release_date && (
          <p className="font-bold text-gray-400 ">
            {format(parseISO(release_date), "dd MMM yyyy")}
          </p>
        )}
      </div>
    </div>
  );
}
