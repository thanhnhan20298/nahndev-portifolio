import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Noto_Sans_JP, Oswald } from "next/font/google";
import { Plausible } from "@/components/analytics/Plausible";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${jp.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <JsonLd />
        <Plausible />
        {children}
      </body>
    </html>
  );
}
