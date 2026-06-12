import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getSermons, getSeries } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sermons",
  description:
    "Watch and listen to teachings from Royal Priesthood Embassy. Browse sermons by series, speaker, and topic.",
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

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-foreground">Browse by Series</h2>
          </ScrollReveal>
          <ScrollReveal className="mt-6 flex flex-wrap gap-3">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/8 hover:text-primary"
              >
                {s.title}
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="register-parchment section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-foreground">All Sermons</h2>
          </ScrollReveal>
          <ScrollReveal stagger={0.08} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
