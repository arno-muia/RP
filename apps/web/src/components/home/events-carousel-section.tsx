"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getUpcomingEvents, formatEventDate } from "@/lib/content";
import type { Event } from "@/types";

async function fetchEvents(): Promise<Event[]> {
  return getUpcomingEvents();
}

export function EventsCarouselSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  if (events.length === 0) return null;

  const current = events[index];

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Mark Your Calendar
          </p>
          <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
            Upcoming Events
          </h3>
        </div>

        <ScrollReveal>
          <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative aspect-[16/9] w-full md:aspect-[21/9]"
              >
                <Link href={`/events/${current.slug}`} className="block h-full w-full">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {events.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {events.map((e, i) => (
              <button
                key={e.id}
                type="button"
                aria-label={`Show event ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto mt-8 max-w-2xl text-center"
          >
            <p className="text-sm font-medium text-primary">
              {formatEventDate(current.date)}
            </p>
            <h4 className="mt-2 font-display text-xl text-foreground md:text-2xl">
              {current.title}
            </h4>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {current.description}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {current.location}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/events/${current.slug}`}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-600"
              >
                View Event &rarr;
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Button href="/events" variant="secondary">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}