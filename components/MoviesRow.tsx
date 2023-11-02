import { Movie } from "@/utilis/types";
import { CardProps } from "./Card";
import { BASE_URL } from "@/utilis/constant";
import Row from "./Row";
import { format, parseISO } from "date-fns";

export default function MoviesRow({ movies }: { movies: Movie[] }) {
  const cards: CardProps[] = movies.map(
    ({
      id,
      poster_path,
      title,
      name,
      original_name,
      vote_average,
      release_date,
    }) => ({
      href: `/movie/${id}`,
      imageSrc: `${BASE_URL}/w300${poster_path}`,
      title: title || name || original_name!,
      subTitle: release_date
        ? format(parseISO(release_date), "yyyy")
        : undefined,
      tmdbVote: Math.floor(vote_average * 10) / 10,
    })
  );

  return <Row cards={cards} />;
}
