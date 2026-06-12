import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { Button } from "@/components/ui/button";
import { getSermons, getSermonBySlug, getRelatedSermons, formatDate } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const sermons = await getSermons();
  return sermons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) return {};
  return createPageMetadata({
    title: sermon.title,
    description: sermon.description,
    path: `/sermons/${slug}`,
  });
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) notFound();

  const related = await getRelatedSermons(sermon);

  return (
    <>
      <PageHero
        title={sermon.title}
        subtitle={`${sermon.speaker} · ${formatDate(sermon.date)} · ${sermon.series}`}
        register="warm"
        scripture={sermon.scripture}
      />

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-charcoal">
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <p className="text-center text-white/90">Watch this teaching on our YouTube channel</p>
              <Button href={sermon.videoUrl} variant="gold" external>
                Watch on YouTube
              </Button>
            </div>
          </div>
          <p className="mt-8 text-lg leading-relaxed text-charcoal">{sermon.description}</p>
          {sermon.scripture && (
            <p className="font-accent mt-4 text-xl text-gold">{sermon.scripture}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href={sermon.videoUrl} variant="primary" external>
              Watch on YouTube
            </Button>
            <Button href="/academy" variant="secondary">
              Kingdom Formation
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding register-parchment">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-2xl uppercase tracking-wide text-burgundy">
              Related Sermons
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <SermonCard key={s.id} sermon={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
