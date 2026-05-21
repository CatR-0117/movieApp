"use client";

import { ChevronDown, Film, Moon, Search, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const themeStorageKey = "moviez-theme";

const applyTheme = (shouldUseDark: boolean) => {
  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
};

const getStoredTheme = () => {
  try {
    return window.localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
};

const storeTheme = (theme: "dark" | "light") => {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {
    return;
  }
};

const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const genresRef = useRef<HTMLDetailsElement>(null);

  const closeGenresMenu = useCallback(() => {
    genresRef.current?.removeAttribute("open");
  }, []);

  useEffect(() => {
    const savedTheme = getStoredTheme();
    const shouldUseDark = savedTheme === "dark";

    applyTheme(shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        genresRef.current &&
        !genresRef.current.contains(event.target as Node)
      ) {
        closeGenresMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGenresMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeGenresMenu]);

  const handleThemeToggle = () => {
    setIsDark((currentTheme) => {
      const nextTheme = !currentTheme;

      applyTheme(nextTheme);
      storeTheme(nextTheme ? "dark" : "light");

      return nextTheme;
    });
  };

  return (
    <nav className="relative z-50 flex w-full max-w-6xl flex-col gap-4 rounded-[8px] bg-white/85 px-3 py-3 text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition-colors dark:bg-zinc-900/85 dark:text-zinc-50 dark:ring-zinc-800 md:flex-row md:items-center md:justify-between">
      <a href="/" className="flex w-fit items-center gap-1">
        <Film className="size-8 text-[#4338CA]" />
        <p className="text-2xl font-extrabold">MovieZ</p>
      </a>
      <div className="flex flex-1 flex-col gap-3 md:max-w-[500px] md:flex-row md:items-center">
        <details className="group relative" ref={genresRef}>
          <summary
            aria-haspopup="menu"
            className="flex h-10 w-full cursor-pointer list-none items-center justify-between gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 md:w-auto [&::-webkit-details-marker]:hidden"
          >
            Genres
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div
            role="menu"
            className="absolute left-0 top-12 z-50 grid w-full min-w-[220px] grid-cols-2 gap-1 rounded-[8px] border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 md:w-[300px]"
          >
            {genres.map((genre) => (
              <a
                key={genre.id}
                role="menuitem"
                href={`https://www.themoviedb.org/discover/movie?with_genres=${genre.id}`}
                onClick={closeGenresMenu}
                className="rounded-md px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {genre.name}
              </a>
            ))}
          </div>
        </details>
        <form
          action="https://www.themoviedb.org/search"
          className="relative flex-1 group"
        >
          <label htmlFor="movie-search" className="sr-only">
            Search movies
          </label>
          <button
            type="submit"
            aria-label="Search movies"
            className="absolute left-0 top-0 flex size-10 items-center justify-center text-zinc-400 transition hover:text-[#4338CA] group-focus-within:text-[#4338CA]"
          >
            <Search className="size-4" />
          </button>
          <input
            id="movie-search"
            name="query"
            required
            type="search"
            placeholder="Search"
            className="h-10 w-full rounded-md border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#4338CA] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          />
        </form>
      </div>
      <button
        type="button"
        onClick={handleThemeToggle}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        {isDark ? (
          <Sun className="size-5 text-[#4338CA]" />
        ) : (
          <Moon className="size-5 text-[#4338CA]" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
