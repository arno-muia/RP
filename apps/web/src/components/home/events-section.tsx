import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DecoratedText } from "@/components/ui/decorated-text";
import { events } from "@/lib/site";

export function EventsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-serif text-4xl text-stone-900 md:text-5xl">
          Upcoming <DecoratedText>Events</DecoratedText>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <article key={event.href} className="group">
              <Link href={event.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <p className="text-sm text-stone-500">{event.date}</p>
                  <h3 className="font-serif text-2xl text-stone-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-stone-500">{event.location}</p>
                </div>
              </Link>
              <div className="mt-4">
                <Button href={event.href} variant="small">
                  Learn More
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/events">View All Events</Button>
        </div>
      </div>
    </section>
  );
}
