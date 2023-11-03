import { formatISO, startOfToday } from "date-fns";
import { Cast, Details, Movie, MovieImages, MovieVideo } from "./types";

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

export async function getPopularMovies(page?: number): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/popular?api_key=${apiKey}&include_adult=false&page=${
        page || 1
      }&language=en-US`,
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

export async function getUpcomingMovies(page?: number): Promise<Movie[]> {
  const today = formatISO(startOfToday(), {
    representation: "date",
  });

  try {
    const res = await fetch(
      `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&page=${
        page || 1
      }&primary_release_date.gte=${today}&sort_by=popularity.desc`,
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

export async function getMovieDetails(id: number): Promise<Details> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`,
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

    return rawResponse;
  } catch (e) {
    throw e;
  }
}

export async function getMovieImages(id: number): Promise<MovieImages> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/${id}/images?api_key=${apiKey}&language=en`,
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

    return rawResponse;
  } catch (e) {
    throw e;
  }
}

export async function getMovieCasts(id: number): Promise<Cast[]> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
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

    return rawResponse.cast;
  } catch (e) {
    throw e;
  }
}

export async function getMovieVideos(id: number): Promise<MovieVideo[]> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
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

export async function getMovieSimilar(id: number): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${apiUrl}/movie/${id}/similar?api_key=${apiKey}&language=en-US`,
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

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${apiUrl}/search/movie?query=${query}&api_key=${apiKey}&language=en-US&include_adult=false`,
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
