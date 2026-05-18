import MovieCard from "@/components/MovieCard";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="px-20">
        <div className="mb-8 flex justify-between">
          <div className="text-2xl font-semibold">Upcoming</div>
          <div className="px-4 py-2 flex gap-2 justify-center items-center h-9">
            See more <ArrowRight></ArrowRight>
          </div>
        </div>
        <div className="flex gap-8 grid grid-cols-4 grid-rows-2 gap-8">
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
          <MovieCard title="How To Train Your Dragon Live Action" rating="6.9"></MovieCard>
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
          <MovieCard title="Dear Santa" rating="6.9"></MovieCard>
        </div>
      </div>
    </>
  );
};

export default Home;
