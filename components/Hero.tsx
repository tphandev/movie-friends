import { Movie } from "@/utilis/types";
import StyledSwiper from "./StyledSwiper";
import MovieSlide from "./MovieSlide";

export default function Hero({ movies }: { movies: Movie[] }) {
  return (
    <header className="text-white bg-black">
      <StyledSwiper
        slides={movies.slice(0, 5).map((movie) => (
          <MovieSlide key={movie.id} {...movie} />
        ))}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        slidesPerView={1}
      />
    </header>
  );
}
