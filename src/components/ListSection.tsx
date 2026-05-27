"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MovieCard, { type MovieCardProps } from "./MovieCard";

type ListSectionProps = {
  movies: MovieCardProps[];
  title: string;
};

const previewMovieCount = 8;

const ListSection = ({ movies, title }: ListSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreMovies = movies.length > previewMovieCount;
  const visibleMovies = isExpanded
    ? movies
    : movies.slice(0, previewMovieCount);

  return (
    <section className="w-full">
      <div className="mb-6 flex min-h-[64px] flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#4338CA]" />
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold leading-8 text-zinc-950 dark:text-zinc-50">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {hasMoreMovies ? (
            <button
              type="button"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((current) => !current)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {isExpanded ? "See less" : "See more"}
              <ChevronDown
                className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {visibleMovies.map((movie) => (
          <MovieCard key={`${title}-${movie.id ?? movie.title}`} {...movie} />
        ))}
      </div>
    </section>
  );
};

export default ListSection;
