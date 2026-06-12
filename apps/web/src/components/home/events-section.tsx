import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getUpcomingEvents } from "@/lib/content";
import { EventCard } from "@/components/content/event-card";

export async function EventsSection() {
  const events = await getUpcomingEvents(3);

  return (
    <section className="register-warm section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Mark Your Calendar
            </p>
            <h2 className="font-display mt-2 text-3xl text-ivory-25 md:text-4xl">
              Upcoming Events
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            View All →
          </Link>
        </ScrollReveal>
        {events.length > 0 ? (
          <ScrollReveal stagger={0.15} className="grid gap-8 md:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ScrollReveal>
        ) : (
          <p className="text-ivory-200/70">No upcoming events at this time.</p>
        )}
        <div className="mt-12 text-center">
          <Button href="/events" variant="ghost">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
