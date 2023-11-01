import { Movie } from "@/utilis/types";
import StyledSwiper from "./StyledSwiper";
import MovieCard from "./MovieCard";

export default function MoviesRow({ movies }: { movies: Movie[] }) {
  return (
    <StyledSwiper
      navigation={{}}
      pagination={false}
      slidesPerView={4}
      spaceBetween={80}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 80,
        },
      }}
      slides={movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    />
  );
}
