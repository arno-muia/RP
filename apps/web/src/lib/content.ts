import siteData from "../../content/site.json";
import sermonsData from "../../content/sermons.json";
import seriesData from "../../content/series.json";
import eventsData from "../../content/events.json";
import leadershipData from "../../content/leadership.json";
import testimonialsData from "../../content/testimonials.json";
import academyModulesData from "../../content/academy-modules.json";
import { getPrisma } from "@/lib/prisma";
import { images } from "@/lib/images";
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
    slug: row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
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

export async function getServiceTimes(): Promise<ServiceTime[]> {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "serviceTimes" } });
    if (config?.value) return config.value as unknown as ServiceTime[];
  }
  return siteJson.serviceTimes;
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

export async function getWelcomeMessage() {
  if (await dbAvailable()) {
    const config = await getPrisma().systemConfig.findUnique({ where: { key: "welcomeMessage" } });
    if (config?.value) return config.value as unknown as SiteData["welcomeMessage"];
  }
  return siteJson.welcomeMessage;
}

export async function getSermons(): Promise<Sermon[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().publicSermon.findMany({
      where: { isPublished: true },
      orderBy: { date: "desc" },
    });
    if (rows.length > 0) return rows.map(mapDbSermon);
  }
  return (sermonsData as Sermon[])
    .filter((s) => s.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

export async function getEvents(): Promise<Event[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().churchEvent.findMany({
      where: { status: { in: ["PUBLISHED", "COMPLETED"] } },
      orderBy: { startDateTime: "desc" },
    });
    if (rows.length > 0) {
      return rows.map(mapDbEvent).map((e, i) => ({
        ...e,
        slug: (eventsData as Event[])[i]?.slug ?? e.slug,
      }));
    }
  }
  return (eventsData as Event[]).filter((e) => e.published);
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const events = (eventsData as Event[])
    .filter((e) => e.published && (e.status === "upcoming" || e.status === "ongoing"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (await dbAvailable()) {
    const rows = await getPrisma().churchEvent.findMany({
      where: { status: "PUBLISHED", startDateTime: { gte: new Date(Date.now() - 30 * 86400000) } },
      orderBy: { startDateTime: "asc" },
    });
    if (rows.length > 0) {
      const mapped = rows.map((row, i) => {
        const jsonEvent = (eventsData as Event[]).find((e) => e.title === row.title);
        const base = mapDbEvent(row);
        return { ...base, slug: jsonEvent?.slug ?? base.slug, status: jsonEvent?.status ?? base.status };
      });
      const filtered = mapped.filter((e) => e.status === "upcoming" || e.status === "ongoing");
      return limit ? filtered.slice(0, limit) : filtered;
    }
  }

  return limit ? events.slice(0, limit) : events;
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const jsonEvent = (eventsData as Event[]).find((e) => e.slug === slug);
  if (jsonEvent) return jsonEvent;

  const events = await getEvents();
  return events.find((e) => e.slug === slug);
}

export async function getLeadership(): Promise<Leader[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().websiteLeader.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length > 0) {
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
  }
  return (leadershipData as Leader[]).sort((a, b) => a.order - b.order);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (await dbAvailable()) {
    const rows = await getPrisma().websiteTestimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        quote: r.quote,
        name: r.name,
        role: r.role ?? undefined,
        photo: r.photoUrl ?? undefined,
      }));
    }
  }
  return testimonialsData as Testimonial[];
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
