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

const carousel = [
  {
    title: "Wicked",
    genre: "Fairy Tale",
    year: "2024",
    rating: "7.3",
    description:
      "Elphaba, a young woman ridiculed for her green skin, and Galinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.",
  },
  {
    title: "Gladiator 2",
    genre: "Action",
    year: "2024",
    rating: "6.4",
    description:
      "After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.",
  },
  {
    title: "Moana 2",
    genre: "Animation",
    year: "2024",
    rating: "6.3",
    description:
      "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
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
    <div className="flex min-h-screen min-w-[960px] flex-col items-center gap-10 bg-zinc-50">
      <CarouselCard slides={carousel} />
      <div className="w-[960px]">
        <div className="my-4 flex flex-col gap-14">
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
