import CarouselCard from "@/components/CarouselCard";
import Footer from "@/components/Footer";
import ListSection from "@/components/ListSection";
import { getMovieHomeData } from "@/lib/tmdb";

const Home = async () => {
  const { carousel, sections } = await getMovieHomeData();

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 bg-zinc-50">
      <main className="flex w-full flex-1 flex-col items-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <CarouselCard slides={carousel} />
        <div className="w-full max-w-6xl">
          <div className="flex flex-col gap-14">
            {sections.map((section) => (
              <ListSection key={section.title} {...section} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
