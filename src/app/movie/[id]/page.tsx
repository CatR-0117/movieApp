import { ArrowLeft, ExternalLink, Home, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { getMovieDetailData } from "@/lib/tmdb";

type MovieDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetailData(id);

  if (!movie) {
    return {
      title: "Movie Not Found | MovieZ",
    };
  }

  return {
    description: movie.overview,
    title: `${movie.title} | MovieZ`,
  };
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const { id } = await params;
  const movie = await getMovieDetailData(id);

  if (!movie) {
    notFound();
  }

  const facts = [
    {
      label: "Release",
      value: movie.releaseDate,
    },
    {
      label: "Runtime",
      value: movie.runtime,
    },
    {
      label: "Status",
      value: movie.status,
    },
    {
      label: "Director",
      value: movie.director,
    },
    {
      label: "Budget",
      value: movie.budget,
    },
    {
      label: "Revenue",
      value: movie.revenue,
    },
  ].filter((fact) => fact.value);

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <main className="flex w-full flex-1 flex-col items-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <NavBar />
        <section className="relative min-h-[560px] w-full max-w-6xl overflow-hidden rounded-[8px] bg-zinc-950 text-white shadow-xl">
          {movie.backdropUrl ? (
            <Image
              src={movie.backdropUrl}
              alt={`${movie.title} backdrop`}
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/35" />
          <div className="relative z-10 grid min-h-[560px] gap-8 p-5 sm:p-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:p-10">
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 text-sm font-medium transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" />
                Back
              </Link>
              <div className="relative aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-[8px] bg-zinc-800 shadow-2xl lg:max-w-none">
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 300px, 240px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800" />
                )}
              </div>
            </div>
            <div className="flex min-w-0 flex-col justify-end gap-6 lg:pb-3">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex h-8 items-center rounded-md bg-white/10 px-3 text-sm font-medium text-white ring-1 ring-white/15"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-white/70">
                  {movie.year}
                </p>
                <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                {movie.tagline ? (
                  <p className="mt-4 max-w-3xl text-lg italic leading-7 text-white/75">
                    {movie.tagline}
                  </p>
                ) : null}
              </div>
              <p className="max-w-3xl text-base leading-7 text-white/85">
                {movie.overview || "No overview available."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {movie.rating ? (
                  <div className="flex min-h-16 items-center gap-2 rounded-[8px] border border-white/15 bg-white/10 px-4">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <div>
                      <p className="text-xs font-medium text-white/60">
                        Rating
                      </p>
                      <p className="font-semibold">{movie.rating}/10</p>
                    </div>
                  </div>
                ) : null}
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="min-h-16 rounded-[8px] border border-white/15 bg-white/10 px-4 py-3"
                  >
                    <p className="text-xs font-medium text-white/60">
                      {fact.label}
                    </p>
                    <p className="font-semibold">{fact.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={movie.tmdbUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#4338CA] px-4 text-sm font-medium transition hover:bg-[#3730A3]"
                >
                  TMDB
                  <ExternalLink className="size-4" />
                </a>
                {movie.homepage ? (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-medium transition hover:bg-white/20"
                  >
                    Official site
                    <Home className="size-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {movie.cast.length ? (
          <section className="w-full max-w-6xl">
            <div className="mb-6 flex min-h-[56px] items-center gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#4338CA]" />
              <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                Cast
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {movie.cast.map((member) => (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-[8px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative aspect-[2/3] bg-zinc-100 dark:bg-zinc-800">
                    {member.profileUrl ? (
                      <Image
                        src={member.profileUrl}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </div>
                  <div className="min-h-[92px] p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-950 dark:text-zinc-50">
                      {member.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                      {member.character || "Cast"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
