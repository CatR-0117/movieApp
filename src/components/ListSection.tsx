import { ArrowRight } from "lucide-react";
import MovieCard, { type MovieCardProps } from "./MovieCard";
import { Button } from "./ui/button";

type ListSectionProps = {
  movies: MovieCardProps[];
  title: string;
};

const ListSection = ({ movies, title }: ListSectionProps) => {
  return (
    <section className="w-full">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="mt-2 h-10 w-1.5 shrink-0 rounded-full bg-[#4338CA]" />
          <div className="min-w-0">
            <h2 className="mt-3 text-2xl font-semibold leading-8 text-zinc-950">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 sm:inline-flex">
            {movies.length} movies
          </span>
          <Button
            type="button"
            variant="outline"
            className="h-9 border-zinc-200 bg-white px-3 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50"
          >
            See more
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => (
          <MovieCard key={`${title}-${movie.title}`} {...movie} />
        ))}
      </div>
    </section>
  );
};

export default ListSection;
