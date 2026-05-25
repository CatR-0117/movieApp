import type { CarouselSlide } from "@/components/CarouselCard";
import type { MovieCardProps } from "@/components/MovieCard";
import { movieGenreMap } from "@/lib/genres";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_REVALIDATE_SECONDS = 60 * 60;
const MOVIES_PER_PAGE = 20;
const SEARCH_FILTER_PAGE_LIMIT = 10;
const TMDB_MAX_PAGE = 500;

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

type TmdbMovieDetail = {
  backdrop_path: string | null;
  budget: number;
  credits?: {
    cast: {
      character: string;
      id: number;
      name: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      job: string;
      name: string;
    }[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
};

type TmdbMovieListResponse = {
  results: TmdbMovie[];
  total_pages?: number;
  total_results?: number;
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

export type MovieSearchData = {
  genreId?: number;
  genreName?: string;
  movies: MovieCardProps[];
  page: number;
  query: string;
  totalMovies: number;
  totalPages: number;
};

export type MovieDetailData = {
  backdropUrl?: string;
  budget?: string;
  cast: {
    character: string;
    id: number;
    name: string;
    profileUrl?: string;
  }[];
  director?: string;
  genres: string[];
  homepage?: string;
  id: number;
  overview: string;
  posterUrl?: string;
  rating?: string;
  releaseDate: string;
  revenue?: string;
  runtime?: string;
  status: string;
  tagline?: string;
  title: string;
  tmdbUrl: string;
  year: string;
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

const formatDate = (releaseDate?: string) => {
  if (!releaseDate) {
    return "TBA";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${releaseDate}T00:00:00Z`));
};

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

const getRequestedPage = (page?: string) => {
  const parsedPage = Number(page);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.min(parsedPage, TMDB_MAX_PAGE);
};

const getTotalPages = (response: TmdbMovieListResponse) => {
  const totalMovies = response.total_results ?? response.results.length;

  if (totalMovies <= 0) {
    return 0;
  }

  return Math.min(
    response.total_pages ?? Math.ceil(totalMovies / MOVIES_PER_PAGE),
    TMDB_MAX_PAGE,
  );
};

const formatCurrency = (amount: number) => {
  if (!amount) {
    return undefined;
  }

  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
};

const formatRuntime = (minutes: number | null) => {
  if (!minutes) {
    return undefined;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) {
    return `${remainingMinutes}m`;
  }

  if (!remainingMinutes) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
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
  id: movie.id,
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
          title: "Upcoming",
        },
      ],
    };
  } catch {
    return fallbackData;
  }
}

const getSearchPages = async (query: string, pages = 3) => {
  const firstPage = await tmdbFetch<TmdbMovieListResponse>("/search/movie", {
    include_adult: "false",
    page: "1",
    query,
  });
  const totalPages = Math.min(firstPage.total_pages ?? 1, pages);

  if (totalPages <= 1) {
    return firstPage.results;
  }

  const additionalPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      tmdbFetch<TmdbMovieListResponse>("/search/movie", {
        include_adult: "false",
        page: String(index + 2),
        query,
      }),
    ),
  );

  return [
    ...firstPage.results,
    ...additionalPages.flatMap((page) => page.results),
  ];
};

const getMovieResultsPage = async (
  path: string,
  params: Record<string, string>,
  requestedPage: number,
) => {
  const fetchPage = (page: number) =>
    tmdbFetch<TmdbMovieListResponse>(path, {
      ...params,
      page: String(page),
    });
  let page = requestedPage;
  let response = await fetchPage(page);
  const totalMovies = response.total_results ?? response.results.length;
  const totalPages = getTotalPages(response);

  if (totalPages > 0 && page > totalPages) {
    page = totalPages;
    response = await fetchPage(page);
  }

  return {
    movies: response.results.slice(0, MOVIES_PER_PAGE),
    page: totalPages > 0 ? page : 1,
    totalMovies,
    totalPages,
  };
};

const getFilteredSearchResultsPage = async (
  query: string,
  selectedGenre: number,
  requestedPage: number,
) => {
  const results = await getSearchPages(query, SEARCH_FILTER_PAGE_LIMIT);
  const filteredResults = results.filter((movie) =>
    movie.genre_ids.includes(selectedGenre),
  );
  const dedupedResults = Array.from(
    new Map(filteredResults.map((movie) => [movie.id, movie])).values(),
  );
  const totalMovies = dedupedResults.length;
  const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  const page =
    totalPages > 0 ? Math.min(requestedPage, totalPages) : requestedPage;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;

  return {
    movies: dedupedResults.slice(startIndex, startIndex + MOVIES_PER_PAGE),
    page: totalPages > 0 ? page : 1,
    totalMovies,
    totalPages,
  };
};

export async function getMovieSearchData({
  genreId,
  page,
  query,
}: {
  genreId?: string;
  page?: string;
  query?: string;
}): Promise<MovieSearchData> {
  const trimmedQuery = query?.trim() ?? "";
  const requestedPage = getRequestedPage(page);
  const parsedGenreId = Number(genreId);
  const selectedGenre =
    Number.isInteger(parsedGenreId) && movieGenreMap.has(parsedGenreId)
      ? parsedGenreId
      : undefined;

  if (!trimmedQuery && !selectedGenre) {
    return {
      movies: [],
      page: 1,
      query: "",
      totalMovies: 0,
      totalPages: 0,
    };
  }

  try {
    const results =
      trimmedQuery && selectedGenre
        ? await getFilteredSearchResultsPage(
            trimmedQuery,
            selectedGenre,
            requestedPage,
          )
        : trimmedQuery
          ? await getMovieResultsPage(
              "/search/movie",
              {
                include_adult: "false",
                query: trimmedQuery,
              },
              requestedPage,
            )
          : await getMovieResultsPage(
              "/discover/movie",
              {
                sort_by: "popularity.desc",
                with_genres: String(selectedGenre),
              },
              requestedPage,
            );

    return {
      genreId: selectedGenre,
      genreName: selectedGenre ? movieGenreMap.get(selectedGenre) : undefined,
      movies: results.movies.map((movie) =>
        mapMovieToCard(movie, movieGenreMap),
      ),
      page: results.page,
      query: trimmedQuery,
      totalMovies: results.totalMovies,
      totalPages: results.totalPages,
    };
  } catch {
    return {
      genreId: selectedGenre,
      genreName: selectedGenre ? movieGenreMap.get(selectedGenre) : undefined,
      movies: [],
      page: 1,
      query: trimmedQuery,
      totalMovies: 0,
      totalPages: 0,
    };
  }
}

export async function getMovieDetailData(
  movieId: string,
): Promise<MovieDetailData | null> {
  const numericMovieId = Number(movieId);

  if (!Number.isInteger(numericMovieId) || numericMovieId <= 0) {
    return null;
  }

  try {
    const movie = await tmdbFetch<TmdbMovieDetail>(`/movie/${numericMovieId}`, {
      append_to_response: "credits",
    });
    const director = movie.credits?.crew.find(
      (member) => member.job === "Director",
    );

    return {
      backdropUrl:
        getTmdbImageUrl(movie.backdrop_path, "w1280") ??
        getTmdbImageUrl(movie.poster_path, "w780"),
      budget: formatCurrency(movie.budget),
      cast:
        movie.credits?.cast.slice(0, 6).map((member) => ({
          character: member.character,
          id: member.id,
          name: member.name,
          profileUrl: getTmdbImageUrl(member.profile_path, "w342"),
        })) ?? [],
      director: director?.name,
      genres: movie.genres.map((genre) => genre.name),
      homepage: movie.homepage ?? undefined,
      id: movie.id,
      overview: movie.overview,
      posterUrl: getTmdbImageUrl(movie.poster_path, "w500"),
      rating: formatRating(movie.vote_average),
      releaseDate: formatDate(movie.release_date),
      revenue: formatCurrency(movie.revenue),
      runtime: formatRuntime(movie.runtime),
      status: movie.status,
      tagline: movie.tagline || undefined,
      title: movie.title,
      tmdbUrl: getTmdbMovieUrl(movie.id),
      year: formatYear(movie.release_date),
    };
  } catch {
    return null;
  }
}
