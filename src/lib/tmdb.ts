import type { CarouselSlide } from "@/components/CarouselCard";
import type { MovieCardProps } from "@/components/MovieCard";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_REVALIDATE_SECONDS = 60 * 60;

type TmdbMovie = {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  title: string;
  vote_average: number;
};

type TmdbMovieListResponse = {
  results: TmdbMovie[];
};

type TmdbGenreResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};

export type MovieSection = {
  href: string;
  movies: MovieCardProps[];
  title: string;
};

type MovieHomeData = {
  carousel: CarouselSlide[];
  sections: MovieSection[];
};

const fallbackMovies: MovieCardProps[] = [
  {
    genre: "",
    imgUrl: "",
    rating: "",
    title: "",
    year: "",
  },
];

const fallbackCarousel: CarouselSlide[] = [
  {
    description: "",
    genre: "",
    imageUrl: "",
    rating: "",
    title: "",
    year: "",
  },
];

const fallbackData: MovieHomeData = {
  carousel: fallbackCarousel,
  sections: [
    {
      href: "https://www.themoviedb.org/movie/now-playing",
      movies: fallbackMovies,
      title: "Now Playing",
    },
    {
      href: "https://www.themoviedb.org/movie/popular",
      movies: fallbackMovies,
      title: "Popular",
    },
    {
      href: "https://www.themoviedb.org/movie/top-rated",
      movies: fallbackMovies,
      title: "Top Rated",
    },
    {
      href: "https://www.themoviedb.org/movie/upcoming",
      movies: fallbackMovies,
      title: "Upcoming",
    },
  ],
};

const getTmdbAccessToken = () =>
  process.env.TMDB_ACCESS_TOKEN ?? process.env.TMDB_BEARER_TOKEN;

const getTmdbImageUrl = (
  path: string | null,
  size: "w342" | "w500" | "w780" | "w1280" | "original",
) => (path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : undefined);

const getTmdbMovieUrl = (id: number) =>
  `https://www.themoviedb.org/movie/${id}`;

const formatYear = (releaseDate?: string) => {
  if (!releaseDate) {
    return "TBA";
  }

  return releaseDate.slice(0, 4);
};

const formatRating = (rating: number) => {
  if (!rating) {
    return undefined;
  }

  return rating.toFixed(1);
};

const getPrimaryGenre = (genreIds: number[], genres: Map<number, string>) => {
  const genre = genreIds.map((id) => genres.get(id)).find(Boolean);

  return genre ?? "Movie";
};

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const accessToken = getTmdbAccessToken();

  if (!accessToken) {
    throw new Error("Missing TMDB access token");
  }

  const url = new URL(`${TMDB_API_BASE_URL}${path}`);
  url.searchParams.set("language", "en-US");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: TMDB_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const mapMovieToCard = (
  movie: TmdbMovie,
  genres: Map<number, string>,
): MovieCardProps => ({
  genre: getPrimaryGenre(movie.genre_ids, genres),
  imgUrl: getTmdbImageUrl(movie.poster_path, "w500"),
  rating: formatRating(movie.vote_average),
  title: movie.title,
  tmdbUrl: getTmdbMovieUrl(movie.id),
  year: formatYear(movie.release_date),
});

const mapMovieToSlide = (
  movie: TmdbMovie,
  genres: Map<number, string>,
): CarouselSlide => ({
  description: movie.overview,
  genre: getPrimaryGenre(movie.genre_ids, genres),
  id: movie.id,
  imageUrl:
    getTmdbImageUrl(movie.backdrop_path, "w1280") ??
    getTmdbImageUrl(movie.poster_path, "w780"),
  rating: formatRating(movie.vote_average),
  title: movie.title,
  tmdbUrl: getTmdbMovieUrl(movie.id),
  year: formatYear(movie.release_date),
});

export async function getMovieHomeData(): Promise<MovieHomeData> {
  try {
    const [genresResponse, trending, nowPlaying, popular, topRated, upcoming] =
      await Promise.all([
        tmdbFetch<TmdbGenreResponse>("/genre/movie/list"),
        tmdbFetch<TmdbMovieListResponse>("/trending/movie/week"),
        tmdbFetch<TmdbMovieListResponse>("/movie/now_playing", { page: "1" }),
        tmdbFetch<TmdbMovieListResponse>("/movie/popular", { page: "1" }),
        tmdbFetch<TmdbMovieListResponse>("/movie/top_rated", { page: "1" }),
        tmdbFetch<TmdbMovieListResponse>("/movie/upcoming", { page: "1" }),
      ]);

    const genres = new Map(
      genresResponse.genres.map((genre) => [genre.id, genre.name]),
    );

    return {
      carousel: trending.results
        .filter((movie) => movie.backdrop_path || movie.poster_path)
        .slice(0, 6)
        .map((movie) => mapMovieToSlide(movie, genres)),
      sections: [
        {
          href: "https://www.themoviedb.org/movie/now-playing",
          movies: nowPlaying.results
            .slice(0, 8)
            .map((movie) => mapMovieToCard(movie, genres)),
          title: "Now Playing",
        },
        {
          href: "https://www.themoviedb.org/movie/popular",
          movies: popular.results
            .slice(0, 8)
            .map((movie) => mapMovieToCard(movie, genres)),
          title: "Popular",
        },
        {
          href: "https://www.themoviedb.org/movie/top-rated",
          movies: topRated.results
            .slice(0, 8)
            .map((movie) => mapMovieToCard(movie, genres)),
          title: "Top Rated",
        },
        {
          href: "https://www.themoviedb.org/movie/upcoming",
          movies: upcoming.results
            .slice(0, 8)
            .map((movie) => mapMovieToCard(movie, genres)),
          title: "Up Coming",
        },
      ],
    };
  } catch {
    return fallbackData;
  }
}
