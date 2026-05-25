import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import { getMovieSearchData } from "@/lib/tmdb";

type SearchPageProps = {
  searchParams: Promise<{
    genre?: string | string[];
    page?: string | string[];
    query?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Search | MovieZ",
};

const getSearchParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
        (page) => page >= 1 && page <= totalPages,
      ),
    ),
  ).sort((firstPage, secondPage) => firstPage - secondPage);

  return pages.flatMap((page, index) => {
    const previousPage = pages[index - 1];

    if (previousPage && page - previousPage > 1) {
      return [`ellipsis-${previousPage}`, page];
    }

    return [page];
  });
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = getSearchParam(params.query) ?? "";
  const genre = getSearchParam(params.genre);
  const page = getSearchParam(params.page);
  const results = await getMovieSearchData({
    genreId: genre,
    page,
    query,
  });
  const resultParts = [
    results.query ? `"${results.query}"` : undefined,
    results.genreName,
  ].filter(Boolean);
  const title = resultParts.length
    ? `Search results for ${resultParts.join(" in ")}`
    : "Search movies";
  const movieCountLabel = `${results.totalMovies} ${
    results.totalMovies === 1 ? "movie" : "movies"
  }`;
  const paginationItems = getPaginationItems(results.page, results.totalPages);
  const getPageHref = (pageNumber: number) => {
    const pageParams = new URLSearchParams();

    if (results.query) {
      pageParams.set("query", results.query);
    }

    if (results.genreId) {
      pageParams.set("genre", String(results.genreId));
    }

    if (pageNumber > 1) {
      pageParams.set("page", String(pageNumber));
    }

    const search = pageParams.toString();

    return search ? `/search?${search}` : "/search";
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <main className="flex w-full flex-1 flex-col items-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <NavBar initialGenreId={results.genreId} initialQuery={results.query} />
        <section className="w-full max-w-6xl">
          <div className="mb-6 flex min-h-[64px] flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <div className="flex min-w-0 items-center gap-4">
              <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#4338CA]" />
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold leading-8 text-zinc-950 dark:text-zinc-50">
                  {title}
                </h1>
              </div>
            </div>
            <span className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {movieCountLabel}
            </span>
          </div>

          {results.movies.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {results.movies.map((movie) => (
                <MovieCard
                  key={`${movie.id ?? movie.title}-${movie.year}`}
                  {...movie}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-[8px] border border-dashed border-zinc-300 bg-white px-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                No movies matched that search.
              </p>
            </div>
          )}
          {results.totalPages > 1 ? (
            <nav
              aria-label="Movie results pagination"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {results.page > 1 ? (
                <Link
                  href={getPageHref(results.page - 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </span>
              )}
              {paginationItems.map((item) =>
                typeof item === "number" ? (
                  item === results.page ? (
                    <span
                      key={item}
                      aria-current="page"
                      className="inline-flex size-10 items-center justify-center rounded-md bg-[#4338CA] text-sm font-semibold text-white"
                    >
                      {item}
                    </span>
                  ) : (
                    <Link
                      key={item}
                      href={getPageHref(item)}
                      className="inline-flex size-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      {item}
                    </Link>
                  )
                ) : (
                  <span
                    key={item}
                    className="inline-flex size-10 items-center justify-center text-sm font-medium text-zinc-400 dark:text-zinc-600"
                  >
                    ...
                  </span>
                ),
              )}
              {results.page < results.totalPages ? (
                <Link
                  href={getPageHref(results.page + 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
                >
                  Next
                  <ChevronRight className="size-4" />
                </span>
              )}
            </nav>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
