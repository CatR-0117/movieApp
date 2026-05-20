import { ArrowRight } from "lucide-react";
import MovieCard, { type MovieCardProps } from "./MovieCard";
import { Button } from "./ui/button";

type ListSectionProps = {
  movies: MovieCardProps[];
  title: string;
};

const ListSection = ({ movies, title }: ListSectionProps) => {
  return (
    <section className="w-[960px]">
      <div className="mb-6 flex h-[64px] items-center justify-between border-b border-zinc-200 pb-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#4338CA]" />
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold leading-8 text-zinc-950">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-500">
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
      <div className="grid grid-cols-[repeat(4,222px)] gap-x-6 gap-y-8">
        {movies.map((movie) => (
          <MovieCard key={`${title}-${movie.title}`} {...movie} />
        ))}
      </div>
    </section>
  );
};

export default ListSection;
