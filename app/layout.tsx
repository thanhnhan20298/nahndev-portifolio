import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Noto_Sans_JP, Oswald } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

const display = Oswald({
  weight: ["600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

const jp = Noto_Sans_JP({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nahndev — Interactive Manga Portfolio",
  description: "Interactive digital manga portfolio — screentone, panel slides, impact slash.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${jp.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
