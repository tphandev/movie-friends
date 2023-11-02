import StyledSwiper from "./StyledSwiper";
import Card, { CardProps } from "./Card";

export default function Row({ cards }: { cards: CardProps[] }) {
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
      slides={cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    />
  );
}
