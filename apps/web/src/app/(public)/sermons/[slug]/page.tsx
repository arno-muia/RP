import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { SermonCard } from "@/components/content/sermon-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { getSermons, getSermonBySlug, getRelatedSermons, formatDate } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

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

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ScrollReveal>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/20 bg-obsidian-900">
              <Image
                src={sermon.thumbnail}
                alt={sermon.title}
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <p className="text-center text-ivory-100/90">
                  Watch this teaching on our YouTube channel
                </p>
                <Button href={sermon.videoUrl} variant="gold" external>
                  Watch on YouTube
                </Button>
              </div>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {sermon.description}
            </p>
            {sermon.scripture && (
              <p className="mt-4 text-lg text-primary">{sermon.scripture}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={sermon.videoUrl} variant="primary" external>
                Watch on YouTube
              </Button>
              <Button href="/academy" variant="secondary">
                Kingdom Formation
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="register-parchment section-padding">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl text-foreground">Related Sermons</h2>
            </ScrollReveal>
            <ScrollReveal stagger={0.08} className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <SermonCard key={s.id} sermon={s} />
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}
