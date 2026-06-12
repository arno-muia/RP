import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getEvents, getEventBySlug, formatEventDate } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return createPageMetadata({
    title: event.title,
    description: event.description,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <PageHero
        title={event.title}
        subtitle={`${formatEventDate(event.date)} · ${event.time} · ${event.location}`}
        register="warm"
      />

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <div className="mt-8 space-y-4">
            <p className="text-lg leading-relaxed text-charcoal">{event.description}</p>
            <div className="rounded-xl border border-burgundy/10 bg-cream p-6">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Date</dt>
                  <dd className="mt-1 font-medium text-burgundy">{formatEventDate(event.date)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Time</dt>
                  <dd className="mt-1 font-medium text-burgundy">{event.time}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gold">Location</dt>
                  <dd className="mt-1 font-medium text-burgundy">{event.location}</dd>
                </div>
              </dl>
            </div>
            <Button href="/visit" variant="primary">
              Plan Your Visit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
