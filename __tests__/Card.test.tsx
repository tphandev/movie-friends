import { render } from "@testing-library/react";
import Card from "@/components/Card";
import "@testing-library/jest-dom";
import tmdbLogo from "@/public/tmdb.svg";

describe("Card", () => {
  it("renders a card", async () => {
    render(
      <Card
        href={"/movie/123"}
        imageSrc={tmdbLogo}
        title={"FastX"}
        subTitle="2023"
        tmdbVote={6.7}
      />
    );

    const link = document.querySelector("a");
    const image = document.querySelector("img");
    const elements = document.querySelectorAll("p");

    expect(image?.alt).toContain("FastX");
    expect(link?.href).toContain("/movie/123");
    expect(elements[0]).toHaveTextContent("FastX");
    expect(elements[1]).toHaveTextContent("6.7");
    expect(elements[2]).toHaveTextContent("2023");
  });

  it("renders a card without subtitle and tmdb vote", async () => {
    render(<Card href={"/movie/123"} imageSrc={tmdbLogo} title={"FastX"} />);

    const elements = document.querySelectorAll("p");
    const link = document.querySelector("a");
    const image = document.querySelector("img");

    expect(image?.alt).toContain("FastX");
    expect(link?.href).toContain("/movie/123");
    expect(elements[0]).toHaveTextContent("FastX");
    expect(elements.length).toEqual(1);
  });
});
