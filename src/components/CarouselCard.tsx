"use client";

import { Play, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export type CarouselCardProps = {
  slides: {
    description: string;
    genre: string;
    imageUrl?: string;
    rating: string;
    title: string;
    year: string;
  }[];
};

const CarouselCard = ({ slides }: CarouselCardProps) => {
  return (
    <Carousel
      opts={{ align: "start", containScroll: "keepSnaps", loop: true }}
      className="h-[540px] w-[1000px] overflow-hidden rounded-[8px] bg-zinc-900 shadow-lg"
    >
      <CarouselContent className="ml-0">
        {slides.map((slide) => (
          <CarouselItem key={slide.title} className="pl-0">
            <div
              style={{ backgroundImage: `url(${slide.imageUrl ?? "/c1.jpg"})` }}
              className="relative h-[540px] w-[1000px] bg-cover bg-center bg-no-repeat"
            >
              <div className="absolute bottom-[75px] left-[75px] w-[380px] font-bold text-white">
                <div className="flex h-6 items-center gap-2 text-xs">
                  <p className="rounded-md bg-[#4338CA] px-2 py-1">Premiere</p>
                  <p>• {slide.year} •</p>
                  <p>{slide.genre}</p>
                </div>
                <p className="my-2 text-4xl font-extrabold leading-[44px]">
                  {slide.title}
                </p>
                <p className="line-clamp-3 w-[320px] text-sm font-normal leading-6 text-white/90">
                  {slide.description}
                </p>
                <button
                  type="button"
                  className="mt-5 flex h-10 items-center gap-2 rounded-md bg-[#4338CA] px-4 text-sm leading-5"
                >
                  <Play className="size-4" />
                  Play Trailer
                </button>
              </div>
              <div className="absolute right-10 top-10 flex h-8 items-center gap-1 rounded-md bg-zinc-950/80 px-2 text-xs font-semibold text-white">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{slide.rating}</span>
                <span className="font-medium text-white/70 text-sm">/10</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="size-9" />
      <CarouselNext className="size-9" />
    </Carousel>
  );
};

export default CarouselCard;
