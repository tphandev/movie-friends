import {
  getMovieCasts,
  getMovieDetails,
  getMovieImages,
  getMovieSimilar,
  getMovieVideos,
} from "@/utilis/api";
import Image from "next/image";
import { BASE_URL } from "@/utilis/constant";
import { format, parseISO } from "date-fns";
import ImageWithFallback from "@/components/ImageWithFallback";
import imdbLogo from "@/public/imdb.svg";
import CastsRow from "@/components/CastsRow";
import MoviesRow from "@/components/MoviesRow";
import StyledSwiper from "@/components/StyledSwiper";
import backdrop from "@/public/backdrop.svg";

async function getData(id: number) {
  const [details, images, casts, videos, similarMovies] = await Promise.all([
    getMovieDetails(id),
    getMovieImages(id),
    getMovieCasts(id),
    getMovieVideos(id),
    getMovieSimilar(id),
  ]);
  return { details, images, casts, videos, similarMovies };
}

export default async function Page({ params }: { params: { id: number } }) {
  const {
    details: {
      backdrop_path,
      title,
      release_date,
      overview,
      genres,
      runtime,
      vote_average,
      imdb_id,
    },
    images: { logos },
    casts,
    videos,
    similarMovies,
  } = await getData(params.id);

  const youTubeVieos = videos.filter((v) => v.site === "YouTube");

  return (
    <main className="mt-16">
      <section className="min-h-[calc(100vh-64px)] text-white bg-black relative lg:mf-grid pb-8">
        <div className="absolute top-0 min-h-[calc(40vh-64px)] w-full right-0 lg:min-h-[calc(100vh-64px)] lg:w-[80vw] z-index-0 ">
          <ImageWithFallback
            src={`${BASE_URL}/w1280${backdrop_path}`}
            alt={title}
            fill
            className="object-cover object-top"
            fallback={backdrop}
          />
          <div className=" absolute w-full h-1/2 lg:h-screen bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent bottom-0" />
        </div>

        <div className="lg:col-span-6 flex flex-col gap-4 pt-[calc(40vh-64px)] lg:pt-24 px-4 lg:px-0 z-10">
          {logos && logos.length > 0 && (
            <div className="relative h-28 lg:h-48 w-auto">
              <Image
                src={`${BASE_URL}/w500${logos[0].file_path}`}
                alt={title}
                fill
                className="object-contain object-left"
              />
            </div>
          )}
          <p className="font-bold text-2xl lg:pt-8">{title}</p>
          <p className="text-sm text-gray-400">
            {[
              format(parseISO(release_date), "dd-MM-yyyy"),
              Math.floor(vote_average * 10) / 10,
              runtime ? `${runtime} minutes` : null,
              ...genres.map((g) => g.name),
            ]
              .filter((i) => i)
              .join(" | ")}
          </p>
          <p>{overview}</p>
          <a
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            className="w-20 h-10 relative"
          >
            <Image
              className="object-cover"
              src={imdbLogo}
              alt="IMDB Logo"
              fill
            />
          </a>
        </div>
      </section>
      {casts && casts.length > 0 && (
        <section className="lg:mf-grid mt-10 lg:mt-20">
          <h2 className="font-bold text-2xl lg:text-4xl lg:col-span-12 px-4 lg:px-0">
            Casts
          </h2>
          <div className="lg:col-span-12 p-2 lg:p-0">
            <CastsRow casts={casts} />
          </div>
        </section>
      )}
      {youTubeVieos.length > 0 && (
        <section className="lg:mf-grid mt-10 lg:mt-20">
          <h2 className="font-bold text-2xl lg:text-4xl lg:col-span-12 px-4 lg:px-0">
            Videos
          </h2>
          <div className="lg:col-span-12 p-2 lg:p-0">
            <StyledSwiper
              navigation={{}}
              pagination={false}
              slidesPerView={3}
              spaceBetween={80}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
              slides={youTubeVieos.map(({ key }) => (
                <iframe
                  key={key}
                  className="w-full h-80"
                  src={`https://www.youtube.com/embed/${key}`}
                ></iframe>
              ))}
            />
          </div>
        </section>
      )}
      {similarMovies && similarMovies.length > 0 && (
        <section className="lg:mf-grid mt-10 lg:mt-20">
          <h2 className="font-bold text-2xl lg:text-4xl lg:col-span-12 px-4 lg:px-0">
            More Like This
          </h2>
          <div className="lg:col-span-12 p-2 lg:p-0">
            <MoviesRow movies={similarMovies} />
          </div>
        </section>
      )}
    </main>
  );
}
