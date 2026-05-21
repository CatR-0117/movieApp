import { Star } from "lucide-react";
import Image from "next/image";

export type MovieCardProps = {
  genre?: string;
  imgUrl?: string;
  rating?: string;
  tmdbUrl?: string;
  title?: string;
  year?: string;
};

const MovieCard = ({
  genre = "",
  imgUrl = "",
  rating = "",
  tmdbUrl,
  title = "",
  year = "",
}: MovieCardProps) => {
  const card = (
    <article className="group h-full overflow-hidden rounded-[8px] border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100">
        <Image
          src={imgUrl}
          alt={`${title} poster`}
          fill
          sizes="(min-width: 1024px) 258px, (min-width: 640px) 30vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {rating ? (
          <div className="absolute left-3 top-3 flex h-8 items-center gap-1 rounded-md bg-zinc-950/80 px-2 text-xs font-semibold text-white">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
            <span className="font-medium text-sm text-white/70">/10</span>
          </div>
        ) : null}
      </div>
      <div className="h-[92px] space-y-2 p-3">
        <div className="flex h-4 items-center gap-2 text-xs font-medium text-zinc-500">
          <span>{year}</span>
          <span className="size-1 rounded-full bg-zinc-300" />
          <span>{genre}</span>
        </div>
        <h3 className="line-clamp-2 h-12 text-base font-semibold leading-6 text-zinc-950">
          {title}
        </h3>
      </div>
    </article>
  );

  if (!tmdbUrl) {
    return card;
  }

  return (
    <a href={tmdbUrl} target="_blank" rel="noreferrer" className="block h-full">
      {card}
    </a>
  );
};

export default MovieCard;
