import { PageHero } from "@/components/shared/page-hero";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getSeries } from "@/lib/content";
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

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal stagger={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="card-hover glass-frost block rounded-xl p-6"
              >
                <h3 className="font-display text-xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.sermonCount} sermons
                </p>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
