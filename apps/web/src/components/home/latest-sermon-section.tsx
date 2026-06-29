import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getLatestSermon, formatDate } from "@/lib/content";

export async function LatestSermonSection() {
  const latestSermon = await getLatestSermon();

  if (!latestSermon) return null;

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div>
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Latest Teaching
            </p>
            <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
              Latest Sermon
            </h3>
          </div>

          <ScrollReveal>
            <div className="glass-frost card-hover flex flex-col overflow-hidden rounded-2xl md:flex-row">
              <div className="relative min-h-[400px] w-full md:min-h-[440px] md:w-5/12 lg:w-2/5">
                <Link
                  href={`/sermons/${latestSermon.slug}`}
                  className="block h-full w-full"
                >
                  <Image
                    src={latestSermon.thumbnail}
                    alt={latestSermon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col px-6 py-10 md:px-10">
                <div>
                  <h4 className="font-display text-xl text-foreground md:text-2xl">
                    {latestSermon.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {latestSermon.speaker} · {formatDate(latestSermon.date)}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {latestSermon.description}
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-2 pt-8">
                  <Link
                    href={`/sermons/${latestSermon.slug}`}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-600"
                  >
                    Watch Now &rarr;
                  </Link>
                  <Link
                    href="/sermons"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-600"
                  >
                    Browse All Sermons &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
