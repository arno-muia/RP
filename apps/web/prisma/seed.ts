/**
 * Seed rpwebsite Turso DB from content JSON + rpweb ministry data.
 * Run: npm run db:seed
 */
import bcrypt from "bcryptjs";
import { ChurchEventStatus, ChurchEventType, UserRole } from "@prisma/client";
import { createScriptPrisma } from "./turso-client";

import { images } from "../src/lib/images";
import siteData from "../content/site.json";
import seriesData from "../content/series.json";
import sermonsData from "../content/sermons.json";
import eventsData from "../content/events.json";
import leadershipData from "../content/leadership.json";
import testimonialsData from "../content/testimonials.json";
import academyData from "../content/academy-modules.json";

const prisma = createScriptPrisma();

const eventTypeMap: Record<string, ChurchEventType> = {
  service: ChurchEventType.SERVICE,
  special: ChurchEventType.FELLOWSHIP,
  outreach: ChurchEventType.OUTREACH,
  training: ChurchEventType.CONFERENCE,
};

const eventStatusMap: Record<string, ChurchEventStatus> = {
  upcoming: ChurchEventStatus.PUBLISHED,
  ongoing: ChurchEventStatus.PUBLISHED,
  past: ChurchEventStatus.COMPLETED,
};

function parseDate(dateStr: string, time?: string): Date {
  const d = new Date(dateStr);
  if (time && time !== "TBD" && time !== "All Month" && time !== "All Day" && time !== "Evening") {
    const match = time.match(/(\d+):(\d+)/);
    if (match) d.setHours(parseInt(match[1], 10), parseInt(match[2], 10));
  }
  return d;
}

async function main() {
  console.log("🌱 Seeding Royal Priesthood website database...");

  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword) {
    throw new Error("Set SEED_ADMIN_PASSWORD in the environment before seeding.");
  }

  const adminPassword = await bcrypt.hash(seedPassword, 12);
  await prisma.user.upsert({
    where: { email: "admin@royalpriesthood.church" },
    update: {
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
      mustChangePassword: false,
    },
    create: {
      email: "admin@royalpriesthood.church",
      name: "Website Admin",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
      mustChangePassword: false,
    },
  });
  console.log("✅ Admin: admin@royalpriesthood.church (password from SEED_ADMIN_PASSWORD)");

  // Site configuration
  const configEntries = [
    { key: "site", value: siteData, description: "Site metadata and copy" },
    {
      key: "serviceTimes",
      value: siteData.serviceTimes,
      description: "Weekly service schedule",
    },
    {
      key: "whatToExpect",
      value: siteData.whatToExpect,
      description: "First visit expectations",
    },
    { key: "beliefs", value: siteData.beliefs, description: "Statement of faith" },
    { key: "values", value: siteData.values, description: "Core values" },
    { key: "visitFaqs", value: siteData.visitFaqs, description: "Visit page FAQs" },
    {
      key: "welcomeMessage",
      value: siteData.welcomeMessage,
      description: "Pastor welcome message",
    },
    {
      key: "heroImage",
      value: images.hero,
      description: "Homepage hero image",
    },
  ];

  for (const entry of configEntries) {
    await prisma.systemConfig.upsert({
      where: { key: entry.key },
      update: { value: entry.value, description: entry.description },
      create: entry,
    });
  }
  console.log("✅ System config seeded");

  // Sermon series
  await prisma.publicSermon.deleteMany();
  await prisma.sermonSeries.deleteMany();

  const seriesIdMap = new Map<string, string>();
  for (const [i, series] of seriesData.entries()) {
    const created = await prisma.sermonSeries.create({
      data: {
        slug: series.slug,
        title: series.title,
        description: series.description,
        imageUrl: series.image,
        sermonCount: series.sermonCount,
        sortOrder: i,
        isPublished: true,
      },
    });
    seriesIdMap.set(series.slug, created.id);
  }
  console.log(`✅ ${seriesData.length} sermon series`);

  for (const sermon of sermonsData) {
    await prisma.publicSermon.create({
      data: {
        slug: sermon.slug,
        title: sermon.title,
        description: sermon.description,
        seriesId: seriesIdMap.get(sermon.seriesSlug) ?? null,
        seriesSlug: sermon.seriesSlug,
        seriesTitle: sermon.series,
        scripture: sermon.scripture ?? null,
        speaker: sermon.speaker,
        date: new Date(sermon.date),
        videoUrl: sermon.videoUrl,
        audioUrl: (sermon as { audioUrl?: string }).audioUrl ?? null,
        notesUrl: (sermon as { notesUrl?: string }).notesUrl ?? null,
        thumbnailUrl: sermon.thumbnail,
        duration: sermon.duration ?? null,
        tags: sermon.tags,
        isPublished: sermon.published,
      },
    });
  }
  console.log(`✅ ${sermonsData.length} sermons`);

  // Events → ChurchEvent
  await prisma.churchEvent.deleteMany();
  for (const event of eventsData) {
    await prisma.churchEvent.create({
      data: {
        title: event.title,
        description: event.description,
        type: eventTypeMap[event.category] ?? ChurchEventType.OTHER,
        startDateTime: parseDate(event.date, event.time),
        location: event.location,
        imageUrl: event.image,
        registrationRequired: event.registrationRequired,
        status: eventStatusMap[event.status] ?? ChurchEventStatus.PUBLISHED,
      },
    });
  }
  console.log(`✅ ${eventsData.length} events`);

  // Leadership
  await prisma.websiteLeader.deleteMany();
  for (const [i, leader] of leadershipData.entries()) {
    await prisma.websiteLeader.create({
      data: {
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        photoUrl: (leader as { photo?: string }).photo ?? "",
        sortOrder: leader.order ?? i,
        social: (leader as { social?: object }).social ?? undefined,
        isPublished: true,
      },
    });
  }
  console.log(`✅ ${leadershipData.length} leaders`);

  // Testimonials
  await prisma.websiteTestimonial.deleteMany();
  for (const [i, t] of testimonialsData.entries()) {
    await prisma.websiteTestimonial.create({
      data: {
        quote: t.quote,
        name: t.name,
        role: t.role ?? null,
        photoUrl: (t as { photo?: string }).photo ?? null,
        sortOrder: i,
        isPublished: true,
      },
    });
  }
  console.log(`✅ ${testimonialsData.length} testimonials`);

  // Academy modules
  await prisma.websiteAcademyModule.deleteMany();
  for (const mod of academyData) {
    await prisma.websiteAcademyModule.create({
      data: {
        title: mod.title,
        description: mod.description,
        instructor: mod.instructor,
        lessonsCount: mod.lessonsCount,
        duration: mod.duration,
        sortOrder: mod.order,
        isPublished: true,
      },
    });
  }
  console.log(`✅ ${academyData.length} academy modules`);

  console.log("🎉 Website database seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
