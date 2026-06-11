import { getSermonsSync, getEventsSync, getSeriesSync } from "@/lib/content";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rpwebsite.vercel.app";

  const staticPages = ["", "/about", "/sermons", "/series", "/visit", "/events", "/academy", "/give", "/contact", "/prayer", "/privacy", "/terms"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sermonPages = getSermonsSync().map((s) => ({
    url: `${base}/sermons/${s.slug}`,
    lastModified: new Date(s.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seriesPages = getSeriesSync().map((s) => ({
    url: `${base}/series/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventPages = getEventsSync().map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...sermonPages, ...seriesPages, ...eventPages];
}
