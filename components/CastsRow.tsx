import { Cast } from "@/utilis/types";
import { CardProps } from "./Card";
import Row from "./Row";
import { BASE_URL } from "@/utilis/constant";

export default function CastsRow({ casts }: { casts: Cast[] }) {
  const cards: CardProps[] = casts.map(
    ({ id, name, original_name, profile_path }) => ({
      href: `https://www.themoviedb.org/person/${id}`,
      imageSrc: `${BASE_URL}/w300${profile_path}`,
      title: name || original_name!,
    })
  );

  return <Row cards={cards} />;
}
