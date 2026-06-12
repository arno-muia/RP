import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types";
import { formatEventDate } from "@/lib/content";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="group card-hover">
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {event.status === "ongoing" && (
            <span className="absolute left-3 top-3 rounded-full bg-fire-500 px-3 py-1 text-xs font-semibold text-white">
              Ongoing
            </span>
          )}
        </div>
        <div className="mt-5 space-y-2">
          <p className="text-sm text-muted-foreground">{formatEventDate(event.date)}</p>
          <h3 className="font-display text-xl text-foreground group-hover:text-primary">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground">{event.location}</p>
        </div>
      </Link>
    </article>
  );
}
