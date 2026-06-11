import Image from "next/image";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <Image
        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2400&q=80"
        alt="Congregation worshipping together"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/35 to-stone-950/70" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <p className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            {site.tagline}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Join Us This Sunday
            </p>
            <p className="mt-2 text-lg text-white/90">
              {site.serviceTimes.join(" · ")}
            </p>
          </div>
          <Button href="/visit" variant="alternate">
            New Here?
          </Button>
        </div>
      </div>
    </section>
  );
}
