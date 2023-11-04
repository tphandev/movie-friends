import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "@/components/Autocomplete";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const mockResponse = JSON.stringify({
  results: [
    {
      adult: false,
      backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
      genre_ids: [28, 80, 53],
      id: 385687,
      original_language: "en",
      original_title: "Fast X",
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
      popularity: 1439.633,
      poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      release_date: "2023-05-17",
      title: "Fast X",
      video: false,
      vote_average: 7.238,
      vote_count: 4110,
    },
  ],
});

describe("Autocomplete", () => {
  it("renders a Autocomplete", async () => {
    render(<Autocomplete />);

    const sreachInput = screen.getByRole("combobox");
    expect(sreachInput).not.toBeNull();

    const options = document.querySelector("ul");
    expect(options).toBeNull();
  });

  it("show Autocommplete options", async () => {
    fetchMock.mockResponseOnce(mockResponse);
    render(<Autocomplete />);

    const sreachInput = screen.getByRole("combobox");
    fireEvent.change(sreachInput, { target: { value: "Fast X" } });

    const options = screen.getByRole("listbox");

    expect(sreachInput).toHaveValue("Fast X");
    expect(options).not.toBeNull();

    await waitFor(() =>
      expect(options?.querySelectorAll("li").length).toBeGreaterThan(0)
    );
  });

  it("show option item", async () => {
    fetchMock.mockResponseOnce(mockResponse);
    render(<Autocomplete />);

    const sreachInput = screen.getByRole("combobox");
    fireEvent.change(sreachInput, { target: { value: "Fast X" } });

    await waitFor(() => {
      const option = screen.getByRole("option");
      const elements = document.querySelectorAll("p");

      expect(option.querySelector("img")?.alt).toEqual("Fast X");
      expect(elements[0]).toHaveTextContent("Fast X");
      expect(elements[1]).toHaveTextContent("2023");
    });
  });

  it("show message if not found", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));
    render(<Autocomplete />);

    const sreachInput = screen.getByRole("combobox");
    fireEvent.change(sreachInput, { target: { value: "qJXe66^Z18x@u3Ha" } });

    expect(screen.findByText("Nothing found")).not.toBeNull();
  });
});
