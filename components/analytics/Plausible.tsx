import Script from "next/script";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/** Optional privacy-friendly analytics — set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local */
export function Plausible() {
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
