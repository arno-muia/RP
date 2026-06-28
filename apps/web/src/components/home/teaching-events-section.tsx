import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getLatestSermon, formatDate, formatEventDate } from "@/lib/content";
import { getUpcomingEvents } from "@/lib/content";

export async function TeachingEventsSection() {
  const [latestSermon, events] = await Promise.all([
    getLatestSermon(),
    getUpcomingEvents(2),
  ]);

  if (!latestSermon && events.length === 0) return null;

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-stretch lg:justify-center">
          {latestSermon && (
            <ScrollReveal className="flex lg:h-full flex-col min-h-0 lg:w-1/2 lg:max-w-xl">
              <div className="mb-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Latest Teaching
                </p>
                <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
                  Latest Sermon
                </h3>
              </div>
              <Link
                href={`/sermons/${latestSermon.slug}`}
                className="group mb-6 block"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/20 shadow-gold">
                  <Image
                    src={latestSermon.thumbnail}
                    alt={latestSermon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Link>
              <div className="flex flex-col items-center text-center">
                  <div>
                    <h4 className="font-display text-xl text-foreground md:text-2xl">
                      {latestSermon.title}
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      {latestSermon.speaker} · {formatDate(latestSermon.date)}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Button
                      href={`/sermons/${latestSermon.slug}`}
                      variant="primary"
                    >
                      Watch Now
                    </Button>
                    <Button href="/sermons" variant="secondary">
                      Browse All Sermons
                    </Button>
                  </div>
                </div>
            </ScrollReveal>
          )}
          {events.length > 0 && (
            <ScrollReveal className="flex lg:h-full flex-col min-h-0 lg:w-1/2 lg:max-w-xl">
              <div className="mb-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Mark Your Calendar
                </p>
                <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
                  Upcoming Events
                </h3>
              </div>
              <div className="mb-[18px] flex flex-1 flex-col gap-[10px] min-h-0">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group flex flex-1 items-stretch gap-4 rounded-xl border border-primary/20 glass-frost p-5 transition-colors hover:border-primary/40 hover:bg-ivory-25/10 lg:p-[20.8px]"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 self-center overflow-hidden rounded-lg lg:h-28 lg:w-28">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="120px"
                      />
                      {event.status === "ongoing" && (
                        <span className="absolute left-1 top-1 rounded-full bg-fire-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          Ongoing
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-center min-w-0">
                      <p className="text-sm text-primary">
                        {formatEventDate(event.date)}
                      </p>
                      <h4 className="truncate font-display text-base text-foreground group-hover:text-primary lg:text-lg">
                        {event.title}
                      </h4>
                      <p className="truncate text-sm text-muted-foreground mt-1">
                        {event.location}
                      </p>
                    </div>
                    <div className="hidden flex-shrink-0 self-center md:block">
                      <span className="text-primary transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button href="/events" variant="secondary">
                  View All Events
                </Button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
