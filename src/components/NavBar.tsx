"use client";

import { ChevronDown, Film, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { movieGenres } from "@/lib/genres";
import { cn } from "@/lib/utils";

const themeStorageKey = "moviez-theme";

const applyTheme = (shouldUseDark: boolean) => {
  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
};

const getStoredTheme = () => {
  try {
    const localTheme = window.localStorage.getItem(themeStorageKey);

    if (localTheme) {
      return localTheme;
    }
  } catch {}

  try {
    return (
      document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${themeStorageKey}=`))
        ?.split("=")[1] ?? null
    );
  } catch {
    return null;
  }
};

const storeTheme = (theme: "dark" | "light") => {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {}

  // biome-ignore lint/suspicious/noDocumentCookie: Keep theme available during app-router navigation and refreshes.
  document.cookie = `${themeStorageKey}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
};

type NavBarProps = {
  initialGenreId?: number;
  initialQuery?: string;
};

const getGenreById = (genreId?: number) =>
  movieGenres.find((genre) => genre.id === genreId);

const NavBar = ({ initialGenreId, initialQuery = "" }: NavBarProps) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(
    () => getGenreById(initialGenreId)?.id,
  );
  const genresRef = useRef<HTMLDetailsElement>(null);
  const selectedGenre = getGenreById(selectedGenreId);

  const closeGenresMenu = useCallback(() => {
    genresRef.current?.removeAttribute("open");
  }, []);

  const syncTheme = useCallback(() => {
    const savedTheme = getStoredTheme();
    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme && document.documentElement.classList.contains("dark"));

    applyTheme(shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    syncTheme();
    window.addEventListener("pageshow", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("pageshow", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, [syncTheme]);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setSelectedGenreId(getGenreById(initialGenreId)?.id);
  }, [initialGenreId, initialQuery]);

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

  const getGenreSearchHref = (genreId?: number) => {
    const params = new URLSearchParams();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
    }

    if (genreId) {
      params.set("genre", String(genreId));
    }

    const search = params.toString();

    return search ? `/search?${search}` : "/";
  };

  const handleGenreSelect = (genreId?: number) => {
    setSelectedGenreId(genreId);
    closeGenresMenu();
    router.push(getGenreSearchHref(genreId));
  };

  const displayedIsDark = hasMounted ? isDark : false;
  const genreLabel = selectedGenre?.name ?? "Genres";

  return (
    <nav className="relative z-50 flex w-full max-w-6xl flex-col gap-4 rounded-[8px] bg-white/85 px-3 py-3 text-zinc-950 shadow-sm ring-1 ring-zinc-200 backdrop-blur transition-colors dark:bg-zinc-900/85 dark:text-zinc-50 dark:ring-zinc-800 md:flex-row md:items-center md:justify-between">
      <Link href="/" className="flex w-fit items-center gap-1">
        <Film className="size-8 text-[#4338CA]" />
        <p className="text-2xl font-extrabold">MovieZ</p>
      </Link>
      <div className="flex flex-1 flex-col gap-3 md:max-w-[500px] md:flex-row md:items-center">
        <details className="group relative" ref={genresRef}>
          <summary
            aria-haspopup="menu"
            className="flex h-10 w-full cursor-pointer list-none items-center justify-between gap-1 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 md:w-auto [&::-webkit-details-marker]:hidden"
          >
            <span className="max-w-[170px] truncate">{genreLabel}</span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div
            role="menu"
            className="absolute left-0 top-12 z-50 grid w-full min-w-[220px] grid-cols-2 gap-1 rounded-[8px] border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 md:w-[300px]"
          >
            {movieGenres.map((genre) => (
              <button
                key={genre.id}
                type="button"
                role="menuitem"
                onClick={() => handleGenreSelect(genre.id)}
                className={cn(
                  "rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
                  selectedGenreId === genre.id &&
                    "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white",
                )}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </details>
        <form action="/search" method="get" className="relative flex-1 group">
          <label htmlFor="movie-search" className="sr-only">
            Search movies
          </label>
          {selectedGenreId ? (
            <input name="genre" type="hidden" value={selectedGenreId} />
          ) : null}
          <button
            type="submit"
            aria-label="Search movies by title and genre"
            className="absolute left-0 top-0 flex size-10 items-center justify-center text-zinc-400 transition hover:text-[#4338CA] group-focus-within:text-[#4338CA]"
          >
            <Search className="size-4" />
          </button>
          <input
            id="movie-search"
            name="query"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="search"
            placeholder="Search title"
            className="h-10 w-full rounded-md border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#4338CA] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          />
        </form>
      </div>
      <button
        type="button"
        onClick={handleThemeToggle}
        aria-label={
          displayedIsDark ? "Switch to light theme" : "Switch to dark theme"
        }
        title={
          displayedIsDark ? "Switch to light theme" : "Switch to dark theme"
        }
        className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        {displayedIsDark ? (
          <Sun className="size-5 text-[#4338CA]" />
        ) : (
          <Moon className="size-5 text-[#4338CA]" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
