import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { getSeries, getSermonsBySeries } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Sermon Series",
  description: "Browse sermon series from Royal Priesthood Embassy.",
  path: "/series",
});

export default async function SeriesPage() {
  const series = await getSeries();

  return (
    <>
      <PageHero
        title="Sermon Series"
        subtitle="Explore teaching collections organized by theme and topic."
        register="parchment"
      />

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="card-hover block rounded-xl border border-burgundy/10 p-6"
              >
                <h3 className="font-display text-2xl uppercase tracking-wide text-burgundy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold">
                  {s.sermonCount} sermons
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
