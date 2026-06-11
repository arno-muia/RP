import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/content";
import { EventCard } from "@/components/content/event-card";

export async function EventsSection() {
  const events = await getUpcomingEvents(3);

  return (
    <section className="register-warm section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Mark Your Calendar</p>
            <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-white md:text-5xl">
              Upcoming Events
            </h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-gold hover:text-gold-light">
            View All →
          </Link>
        </div>
        {events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-white/70">No upcoming events at this time.</p>
        )}
        <div className="mt-12 text-center">
          <Button href="/events" variant="secondary" className="border-white text-white hover:bg-white hover:text-burgundy">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
