import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getSeriesSync, getSeriesBySlug, getSermonsBySeries } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSeriesSync().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) return {};
  return createPageMetadata({
    title: series.title,
    description: series.description,
    path: `/series/${slug}`,
  });
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  const sermons = await getSermonsBySeries(slug);

  return (
    <>
      <PageHero
        title={series.title}
        subtitle={series.description}
        register="parchment"
      />

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {sermons.length > 0 ? (
            <ScrollReveal stagger={0.08} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </ScrollReveal>
          ) : (
            <p className="text-center text-muted-foreground">
              Sermons in this series are being added. Check back soon or browse our full library.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
