import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitializerScript = `
(() => {
  try {
    const themeStorageKey = "moviez-theme";
    let theme = window.localStorage.getItem(themeStorageKey);

    if (!theme) {
      theme = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(themeStorageKey + "="))
        ?.split("=")[1];
    }

    const shouldUseDark = theme === "dark";
    const root = document.documentElement;

    root.classList.toggle("dark", shouldUseDark);
    root.style.colorScheme = shouldUseDark ? "dark" : "light";
  } catch {
  }
})();
`;

export const metadata: Metadata = {
  title: "Movie App",
  description: "Browse trending, popular, top-rated, and upcoming movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <Script id="moviez-theme" strategy="beforeInteractive">
          {themeInitializerScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
