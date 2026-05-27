"use client";

import { ArrowRight, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export type CarouselSlide = {
  description: string;
  genre: string;
  id?: number;
  imageUrl?: string;
  rating?: string;
  title: string;
  tmdbUrl?: string;
  year: string;
};

export type CarouselCardProps = {
  slides: CarouselSlide[];
};

const CarouselCard = ({ slides }: CarouselCardProps) => {
  return (
    <Carousel
      opts={{ align: "start", containScroll: "keepSnaps", loop: true }}
      className="h-[440px] w-full max-w-6xl overflow-hidden rounded-[8px] bg-zinc-900 shadow-lg sm:h-[500px] lg:h-[540px]"
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id ?? slide.title} className="pl-0">
            <div className="relative h-[440px] w-full overflow-hidden bg-zinc-900 sm:h-[500px] lg:h-[540px]">
              {slide.id ? (
                <Link
                  href={`/movie/${slide.id}`}
                  aria-label={`View ${slide.title} details`}
                  className="absolute inset-0 z-10 block cursor-pointer"
                >
                  {slide.imageUrl ? (
                    <Image
                      src={slide.imageUrl}
                      alt={`${slide.title} backdrop`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 1152px, 100vw"
                      className="object-cover transition duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                  )}
                </Link>
              ) : slide.imageUrl ? (
                <Image
                  src={slide.imageUrl}
                  alt={`${slide.title} backdrop`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-900" />
              )}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-zinc-950/85 via-zinc-950/40 to-transparent" />
              <div className="pointer-events-none absolute inset-x-5 bottom-8 z-20 max-w-[430px] font-bold text-white sm:bottom-14 sm:left-10 lg:bottom-[75px] lg:left-[75px]">
                <div className="flex min-h-6 flex-wrap items-center gap-2 text-xs">
                  <p className="rounded-md bg-[#4338CA] px-2 py-1">Trending</p>
                  <span className="size-1 rounded-full bg-white/50" />
                  <p>{slide.year}</p>
                  <span className="size-1 rounded-full bg-white/50" />
                  <p>{slide.genre}</p>
                </div>
                <h1 className="my-2 line-clamp-2 text-3xl font-extrabold leading-10 sm:text-4xl sm:leading-[44px]">
                  {slide.title}
                </h1>
                <p className="line-clamp-3 max-w-[380px] text-sm font-normal leading-6 text-white/90">
                  {slide.description}
                </p>
                {slide.id ? (
                  <Link
                    href={`/movie/${slide.id}`}
                    className="pointer-events-auto mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#4338CA] px-4 text-sm leading-5 transition hover:bg-[#3730A3]"
                  >
                    View details
                    <ArrowRight className="size-4" />
                  </Link>
                ) : slide.tmdbUrl ? (
                  <a
                    href={slide.tmdbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#4338CA] px-4 text-sm leading-5 transition hover:bg-[#3730A3]"
                  >
                    View details
                    <ExternalLink className="size-4" />
                  </a>
                ) : null}
              </div>
              {slide.rating ? (
                <div className="pointer-events-none absolute right-5 top-5 z-20 flex h-8 items-center gap-1 rounded-md bg-zinc-950/80 px-2 text-xs font-semibold text-white sm:right-10 sm:top-10">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{slide.rating}</span>
                  <span className="font-medium text-sm text-white/70">/10</span>
                </div>
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-30 size-9 border-white/20 bg-zinc-950/70 text-white sm:left-5" />
      <CarouselNext className="right-3 z-30 size-9 border-white/20 bg-zinc-950/70 text-white sm:right-5" />
    </Carousel>
  );
};

export default CarouselCard;
