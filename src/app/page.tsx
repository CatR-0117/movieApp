"use client";

import CarouselCard from "@/components/CarouselCard";
import Footer from "@/components/Footer";
import ListSection from "@/components/ListSection";

const movieSections = [
  {
    title: "Upcoming",
  },
  {
    title: "Popular",
  },
  {
    title: "Top Rated",
  },
];

const movies = [
  {
    genre: "Comedy",
    rating: "6.9",
    title: "Dear Santa",
    year: "2024",
  },
  {
    genre: "Adventure",
    rating: "7.4",
    title: "How To Train Your Dragon Live Action",
    year: "2025",
  },
  {
    genre: "Drama",
    rating: "8.1",
    title: "Alien Romulus",
    year: "2025",
  },
  {
    genre: "Action",
    rating: "7.8",
    title: "From the Ashes",
    year: "2024",
  },
  {
    genre: "Family",
    rating: "7.2",
    title: "Space Dogg",
    year: "2025",
  },
  {
    genre: "Mystery",
    rating: "8.4",
    title: "The Order",
    year: "2024",
  },
];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50">
      <div>
        <div className="flex">
          <p>2026</p>
          <p>genre</p>
        </div>
        <p>Dear santa</p>
        <p>description</p>
        <button>Watch trailer</button>
      </div>
      <div className="w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-col gap-14 md:gap-16">
          {movieSections.map((section) => (
            <ListSection key={section.title} {...section} movies={movies} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
