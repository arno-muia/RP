import Link from "next/link";
import Image from "next/image";
import type { Sermon } from "@/types";
import { formatDate } from "@/lib/content";

type SermonCardProps = {
  sermon: Sermon;
};

export function SermonCard({ sermon }: SermonCardProps) {
  return (
    <article className="group card-hover">
      <Link href={`/sermons/${sermon.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
          <Image
            src={sermon.thumbnail}
            alt={sermon.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {sermon.duration && (
            <span className="absolute bottom-3 right-3 rounded-md bg-obsidian-900/80 px-2 py-1 font-data text-xs text-white">
              {sermon.duration}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {sermon.series}
          </span>
          <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-primary">
            {sermon.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {sermon.speaker} · {formatDate(sermon.date)}
          </p>
        </div>
      </Link>
    </article>
  );
}
