import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DecoratedText } from "@/components/ui/decorated-text";
import { site } from "@/lib/site";

export function MissionSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
            Love <DecoratedText>God.</DecoratedText> Love{" "}
            <DecoratedText>People.</DecoratedText> Change{" "}
            <DecoratedText>The World.</DecoratedText>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 md:text-xl">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/visit">Plan My Visit</Button>
            <Button href="/about" variant="link" className="gap-1">
              Who We Are →
            </Button>
          </div>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:mt-16">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80"
              alt="People gathering in community"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1507692049790-ef8ecb2d88a0?auto=format&fit=crop&w=1000&q=80"
              alt="Worship experience"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
