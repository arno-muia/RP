import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
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

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ScrollReveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {event.description}
              </p>
              <div className="glass-frost rounded-xl p-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Date
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {formatEventDate(event.date)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Time
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{event.time}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Location
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{event.location}</dd>
                  </div>
                </dl>
              </div>
              <Button href="/visit#rsvp" variant="primary">
                Plan Your Visit
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
