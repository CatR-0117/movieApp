import { Star } from "lucide-react";
import Image from "next/image";

export type MovieCardProps = {
  genre?: string;
  imgUrl?: string;
  rating?: string;
  title?: string;
  year?: string;
};

const MovieCard = ({
  genre = "",
  imgUrl = "/Movie1.jpg",
  rating = "",
  title = "",
  year = "",
}: MovieCardProps) => {
  return (
    <section className="group overflow-hidden rounded-[8px] border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100">
        <Image
          src={imgUrl}
          alt={`${title} poster`}
          fill
          sizes="(min-width: 1280px) 248px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 44vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-zinc-950/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
          <span className="font-medium text-white/70 text-sm">/10</span>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <span>{year}</span>
          <span className="size-1 rounded-full bg-zinc-300" />
          <span>{genre}</span>
        </div>
        <h3 className="min-h-12 text-base font-semibold leading-6 text-zinc-950">
          {title}
        </h3>
      </div>
    </section>
  );
};

export default MovieCard;
