import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const MovieDetail = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-10 bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <main className="flex w-full flex-1 flex-col items-center gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <NavBar />
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold">Movie Details</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Movie details page content goes here
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetail;
