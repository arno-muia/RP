import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DecoratedText } from "@/components/ui/decorated-text";

export function VisitSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Join Us This Sunday
            </p>
            <h2 className="mt-4 font-serif text-4xl text-stone-900 md:text-5xl">
              You&apos;re <DecoratedText>Invited</DecoratedText>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Whether you are exploring faith, looking for a church home, or have
              walked with Jesus for years — we have a place for you.
            </p>
            <div className="mt-8">
              <Button href="/visit" variant="primary">
                Plan Your Visit
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:mt-10">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                alt="People connecting after service"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
                alt="Community fellowship"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
