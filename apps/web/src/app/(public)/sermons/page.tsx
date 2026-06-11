import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { getSermons, getSeries } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Sermons",
  description: "Watch and listen to teachings from Royal Priesthood Embassy. Browse sermons by series, speaker, and topic.",
  path: "/sermons",
});

export default async function SermonsPage() {
  const sermons = await getSermons();
  const series = await getSeries();

  return (
    <>
      <PageHero
        title="Sermon Library"
        subtitle="Teaching that equips you to walk in your royal identity and daily Kingdom influence."
        register="parchment"
      />

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-burgundy">
            Browse by Series
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="rounded-full border border-burgundy/20 px-4 py-2 text-sm font-medium text-burgundy transition-colors hover:bg-burgundy hover:text-white"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-burgundy">
            All Sermons
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
