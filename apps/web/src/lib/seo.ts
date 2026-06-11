import type { Metadata } from "next";
import siteData from "../../content/site.json";

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const site = siteData;
  const fullTitle = title === site.name ? site.name : `${title} | ${site.shortName}`;
  const desc = description ?? site.description;
  const url = `https://rpwebsite.vercel.app${path}`;

  return {
    title: fullTitle,
    description: desc,
    openGraph: { title: fullTitle, description: desc, type: "website", url, siteName: site.name },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    alternates: { canonical: url },
  };
}

export function churchSchema() {
  const site = siteData;
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    description: site.description,
    url: "https://rpwebsite.vercel.app",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
  };
}
