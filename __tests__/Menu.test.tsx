import { render } from "@testing-library/react";
import Menu from "@/components/Menu";
import "@testing-library/jest-dom";

describe("Menu", () => {
  it("renders a Menu", async () => {
    render(<Menu />);

    const links = document.querySelectorAll("a");

    expect(links[0]).toHaveTextContent("MovieFriends");
    expect(links[1]).toHaveTextContent("Popular Movies");
    expect(links[2]).toHaveTextContent("Upcoming Movies");
  });

  it("render link correctly", async () => {
    render(<Menu />);

    const links = document.querySelectorAll("a");

    expect(links[0].href).toContain("/");
    expect(links[1].href).toContain("/popular");
    expect(links[2].href).toContain("/upcoming");
  });
});
