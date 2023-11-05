export type Genre = {
  id: number;
  name: string;
};

export type MovieImage = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: any;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Movie = {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  video: boolean;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type Details = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  title: string;
  name: string;
  original_name: string;
  vote_average: number;
  runtime: number;
  imdb_id: string;
};

export type MovieImages = {
  id: number;
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
};

export type MovieVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: string;
  type: string;
};

export type Cast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: string;
  profile_path: string;
};

export type User = {
  id: number;
  email: string;
  name?: string;
  createAt: string;
  updateAt: string;
};
