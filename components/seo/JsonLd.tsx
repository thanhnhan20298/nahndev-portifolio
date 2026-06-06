import { about } from "@/lib/content/about";
import { contact } from "@/lib/content/contact";
import { siteConfig } from "@/lib/config/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.tagline,
    description: about.summary,
    url: siteConfig.url,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: about.location,
    },
    sameAs: contact.socials.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
