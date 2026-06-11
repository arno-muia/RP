import Image from "next/image";
import Link from "next/link";
import { DecoratedText } from "@/components/ui/decorated-text";
import { ministries } from "@/lib/site";

export function MinistriesSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Welcome Home
          </p>
          <h2 className="mt-4 font-serif text-4xl text-stone-900 md:text-5xl">
            There is a place here for{" "}
            <DecoratedText>Everybody</DecoratedText>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => (
            <Link
              key={ministry.href}
              href={ministry.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={ministry.image}
                alt={ministry.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-serif text-2xl">{ministry.title}</h3>
                <p className="mt-2 text-sm text-white/80">Learn More →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
