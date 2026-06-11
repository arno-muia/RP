import Image from "next/image";
import { Button } from "@/components/ui/button";
import { latestSermon } from "@/lib/site";

export function SermonSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={latestSermon.image}
              alt={latestSermon.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-8 w-8"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Latest Sermon
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
              {latestSermon.title}
            </h2>
            <p className="mt-4 text-stone-600">
              {latestSermon.speaker} · {latestSermon.date}
            </p>
            <div className="mt-8">
              <Button href={latestSermon.href}>Watch Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
