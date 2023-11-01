import { formatISO, startOfDay, startOfToday } from "date-fns";
import { Movie } from "./types";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${apiUrl}/trending/movie/week?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const rawResponse = await res.json();
    if (res.status !== 200) {
      throw new Error(rawResponse["status_message"]);
    }

    return rawResponse.results;
  } catch (e) {
    throw e;
  }
}

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const rawResponse = await res.json();
    if (res.status !== 200) {
      throw new Error(rawResponse["status_message"]);
    }

    return rawResponse.results;
  } catch (e) {
    throw e;
  }
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const today = formatISO(startOfToday(), {
    representation: "date",
  });

  try {
    const res = await fetch(
      `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=1&primary_release_date.gte=${today}&sort_by=popularity.desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const rawResponse = await res.json();
    if (res.status !== 200) {
      throw new Error(rawResponse["status_message"]);
    }

    return rawResponse.results;
  } catch (e) {
    throw e;
  }
}
