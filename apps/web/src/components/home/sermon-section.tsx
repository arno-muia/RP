import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLatestSermon, formatDate } from "@/lib/content";

export async function SermonSection() {
  const latestSermon = await getLatestSermon();
  if (!latestSermon) return null;

  return (
    <section className="register-celestial section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Latest Teaching</p>
        <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-burgundy md:text-5xl">
          Latest Sermon
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Link href={`/sermons/${latestSermon.slug}`} className="group block">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={latestSermon.thumbnail}
                alt={latestSermon.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Link>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
                {latestSermon.title}
              </h3>
              <p className="mt-2 text-muted">
                {latestSermon.speaker} · {formatDate(latestSermon.date)}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href={`/sermons/${latestSermon.slug}`} variant="primary">Watch Now</Button>
              <Button href="/sermons" variant="secondary">Browse All Sermons</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
