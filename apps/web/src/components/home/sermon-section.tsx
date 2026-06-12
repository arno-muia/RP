import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getLatestSermon, formatDate } from "@/lib/content";

export async function SermonSection() {
  const latestSermon = await getLatestSermon();
  if (!latestSermon) return null;

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Latest Teaching
          </p>
          <h2 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            Latest Sermon
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <Link href={`/sermons/${latestSermon.slug}`} className="group block">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/20 shadow-gold">
                <Image
                  src={latestSermon.thumbnail}
                  alt={latestSermon.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal className="space-y-6">
            <div>
              <h3 className="font-display text-2xl text-foreground md:text-3xl">
                {latestSermon.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {latestSermon.speaker} · {formatDate(latestSermon.date)}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href={`/sermons/${latestSermon.slug}`} variant="primary">
                Watch Now
              </Button>
              <Button href="/sermons" variant="secondary">
                Browse All Sermons
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
