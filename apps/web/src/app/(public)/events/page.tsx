import { PageHero } from "@/components/shared/page-hero";
import { EventCard } from "@/components/content/event-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getEvents, getUpcomingEvents } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Events",
  description:
    "Upcoming events, outreach, and special gatherings at Royal Priesthood Embassy in Thika.",
  path: "/events",
});

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents();
  const past = (await getEvents()).filter((e) => e.status === "past");

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Join us for worship nights, outreach, fellowship, and Kingdom gatherings in Thika and beyond."
        register="warm"
      />

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-foreground">Upcoming & Ongoing</h2>
          </ScrollReveal>
          {upcoming.length > 0 ? (
            <ScrollReveal stagger={0.1} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ScrollReveal>
          ) : (
            <p className="mt-6 text-muted-foreground">No upcoming events at this time.</p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="register-parchment section-padding">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl text-foreground">Past Events</h2>
            </ScrollReveal>
            <ScrollReveal stagger={0.1} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}
