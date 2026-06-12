import { unstable_cache } from "next/cache";
import siteData from "../../content/site.json";
import sermonsData from "../../content/sermons.json";
import seriesData from "../../content/series.json";
import eventsData from "../../content/events.json";
import leadershipData from "../../content/leadership.json";
import testimonialsData from "../../content/testimonials.json";
import academyModulesData from "../../content/academy-modules.json";
import { getPrisma } from "@/lib/prisma";
import { images } from "@/lib/images";
import { eventSlug } from "@/lib/slug";
import type {
  AcademyModule,
  Belief,
  Event,
  FaqItem,
  Leader,
  Sermon,
  SermonSeries,
  ServiceTime,
  SiteConfig,
  Testimonial,
  Value,
  WhatToExpectItem,
} from "@/types";

type SiteData = SiteConfig & {
  serviceTimes: ServiceTime[];
  whatToExpect: WhatToExpectItem[];
  beliefs: Belief[];
  values: Value[];
  visitFaqs: FaqItem[];
  welcomeMessage: { title: string; message: string; author: string };
};

const siteJson = siteData as SiteData;

function mapDbSermon(row: {
  slug: string;
  title: string;
  description: string;
  seriesSlug: string;
  seriesTitle: string;
  scripture: string | null;
  speaker: string;
  date: Date;
  videoUrl: string;
  audioUrl: string | null;
  notesUrl: string | null;
  thumbnailUrl: string;
  duration: string | null;
  tags: unknown;
  isPublished: boolean;
}): Sermon {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    description: row.description,
    series: row.seriesTitle,
    seriesSlug: row.seriesSlug,
    scripture: row.scripture ?? undefined,
    speaker: row.speaker,
    date: row.date.toISOString().split("T")[0],
    videoUrl: row.videoUrl,
    audioUrl: row.audioUrl ?? undefined,
    notesUrl: row.notesUrl ?? undefined,
    thumbnail: row.thumbnailUrl,
    duration: row.duration ?? undefined,
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    published: row.isPublished,
  };
}

function mapDbEvent(row: {
  id: string;
  title: string;
  description: string | null;
  startDateTime: Date;
  location: string | null;
  imageUrl: string | null;
  registrationRequired: boolean;
  status: string;
}): Event {
  const status =
    row.status === "COMPLETED"
      ? "past"
      : row.status === "PUBLISHED" && row.startDateTime > new Date()
        ? "upcoming"
        : row.status === "PUBLISHED"
          ? "ongoing"
          : "past";

  return {
    id: row.id,
    slug: eventSlug(row.title, row.id),
    title: row.title,
    description: row.description ?? "",
    date: row.startDateTime.toISOString().split("T")[0],
    time: row.startDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    location: row.location ?? "Thika, Kenya",
    image: row.imageUrl ?? "/images/posters/kingdom-formation.jpeg",
    category: "special",
    registrationRequired: row.registrationRequired,
    published: true,
    status,
  };
}

async function dbAvailable(): Promise<boolean> {
  try {
    const prisma = getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/** DB-first: use JSON only when Turso is unreachable (local dev). */
function useJsonFallback(): boolean {
  return process.env.NODE_ENV !== "production";
}

const CACHE_TTL = 60;

export async function getSiteConfig(): Promise<SiteData> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "site" } });
    if (config?.value) return config.value as unknown as SiteData;
  }
  return siteJson;
}

export async function getHeroImage(): Promise<string> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "heroImage" } });
    if (config?.value && typeof config.value === "string") return config.value;
  }
  return images.hero;
}

async function fetchServiceTimes(): Promise<ServiceTime[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "serviceTimes" } });
    if (config?.value) {
      const v = config.value;
      if (typeof v === "string") {
        try {
          return JSON.parse(v) as ServiceTime[];
        } catch {
          return siteJson.serviceTimes;
        }
      }
      return v as unknown as ServiceTime[];
    }
  }
  return siteJson.serviceTimes;
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  return unstable_cache(fetchServiceTimes, ["content-service-times"], {
    tags: ["site-config"],
    revalidate: CACHE_TTL,
  })();
}

export async function getWhatToExpect(): Promise<WhatToExpectItem[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "whatToExpect" } });
    if (config?.value) return config.value as unknown as WhatToExpectItem[];
  }
  return siteJson.whatToExpect;
}

export async function getBeliefs(): Promise<Belief[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "beliefs" } });
    if (config?.value) return config.value as unknown as Belief[];
  }
  return siteJson.beliefs;
}

export async function getValues(): Promise<Value[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "values" } });
    if (config?.value) return config.value as unknown as Value[];
  }
  return siteJson.values;
}

export async function getVisitFaqs(): Promise<FaqItem[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "visitFaqs" } });
    if (config?.value) return config.value as unknown as FaqItem[];
  }
  return siteJson.visitFaqs;
}

async function fetchWelcomeMessage() {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "welcomeMessage" } });
    if (config?.value) {
      const v = config.value;
      if (typeof v === "string") {
        try {
          return JSON.parse(v) as SiteData["welcomeMessage"];
        } catch {
          return { title: "Welcome", message: v, author: "Pastor Charles" };
        }
      }
      return v as unknown as SiteData["welcomeMessage"];
    }
  }
  return siteJson.welcomeMessage;
}

export async function getWelcomeMessage() {
  return unstable_cache(fetchWelcomeMessage, ["content-welcome"], {
    tags: ["site-config"],
    revalidate: CACHE_TTL,
  })();
}

async function fetchSermons(): Promise<Sermon[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().publicSermon.findMany({
      where: { isPublished: true },
      orderBy: { date: "desc" },
    });
    return rows.map(mapDbSermon);
  }
  if (!useJsonFallback()) return [];
  return (sermonsData as Sermon[])
    .filter((s) => s.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getSermons(): Promise<Sermon[]> {
  return unstable_cache(fetchSermons, ["content-sermons"], {
    tags: ["sermons"],
    revalidate: CACHE_TTL,
  })();
}

export async function getSermonBySlug(slug: string): Promise<Sermon | undefined> {
  if (await dbAvailable()) {
    const row = await getPrisma().publicSermon.findUnique({ where: { slug } });
    if (row) return mapDbSermon(row);
  }
  return (sermonsData as Sermon[]).find((s) => s.slug === slug);
}

export async function getLatestSermon(): Promise<Sermon | undefined> {
  const sermons = await getSermons();
  return sermons[0];
}

export async function getRelatedSermons(sermon: Sermon, limit = 3): Promise<Sermon[]> {
  const sermons = await getSermons();
  return sermons
    .filter((s) => s.slug !== sermon.slug && s.seriesSlug === sermon.seriesSlug)
    .slice(0, limit);
}

export async function getSeries(): Promise<SermonSeries[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().sermonSeries.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.slug,
        slug: r.slug,
        title: r.title,
        description: r.description,
        image: r.imageUrl,
        sermonCount: r.sermonCount,
      }));
    }
  }
  return seriesData as SermonSeries[];
}

export async function getSeriesBySlug(slug: string): Promise<SermonSeries | undefined> {
  const all = await getSeries();
  return all.find((s) => s.slug === slug);
}

export async function getSermonsBySeries(seriesSlug: string): Promise<Sermon[]> {
  const sermons = await getSermons();
  return sermons.filter((s) => s.seriesSlug === seriesSlug);
}

async function fetchEvents(): Promise<Event[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().churchEvent.findMany({
      where: { status: { in: ["PUBLISHED", "COMPLETED"] } },
      orderBy: { startDateTime: "desc" },
    });
    return rows.map(mapDbEvent);
  }
  if (!useJsonFallback()) return [];
  return (eventsData as Event[]).filter((e) => e.published);
}

export async function getEvents(): Promise<Event[]> {
  return unstable_cache(fetchEvents, ["content-events"], {
    tags: ["events"],
    revalidate: CACHE_TTL,
  })();
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const events = await getEvents();
  const upcoming = events
    .filter((e) => e.status === "upcoming" || e.status === "ongoing")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug);
}

async function fetchLeadership(): Promise<Leader[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().websiteLeader.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      bio: r.bio,
      photo: r.photoUrl ? r.photoUrl : undefined,
      order: r.sortOrder,
      social: r.social as Leader["social"],
    }));
  }
  if (!useJsonFallback()) return [];
  return (leadershipData as Leader[]).sort((a, b) => a.order - b.order);
}

export async function getLeadership(): Promise<Leader[]> {
  return unstable_cache(fetchLeadership, ["content-leadership"], {
    tags: ["leadership"],
    revalidate: CACHE_TTL,
  })();
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().websiteTestimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      name: r.name,
      role: r.role ?? undefined,
      photo: r.photoUrl ?? undefined,
    }));
  }
  if (!useJsonFallback()) return [];
  return testimonialsData as Testimonial[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return unstable_cache(fetchTestimonials, ["content-testimonials"], {
    tags: ["testimonials"],
    revalidate: CACHE_TTL,
  })();
}

export async function getAcademyModules(): Promise<AcademyModule[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().websiteAcademyModule.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        instructor: r.instructor,
        lessonsCount: r.lessonsCount,
        duration: r.duration,
        order: r.sortOrder,
      }));
    }
  }
  return (academyModulesData as AcademyModule[]).sort((a, b) => a.order - b.order);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatEventDate(dateString: string): string {
  return formatDate(dateString);
}

// Sync JSON fallbacks for static generation at build time
export function getSermonsSync(): Sermon[] {
  return (sermonsData as Sermon[]).filter((s) => s.published);
}

export function getEventsSync(): Event[] {
  return (eventsData as Event[]).filter((e) => e.published);
}

export function getSeriesSync(): SermonSeries[] {
  return seriesData as SermonSeries[];
}
