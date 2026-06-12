import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroAnimator } from "@/components/motion/scroll-reveal";
import { getHeroImage } from "@/lib/content";
import { site } from "@/lib/site";

export async function HeroSection() {
  const heroImage = await getHeroImage();

  return (
    <HeroAnimator className="relative min-h-screen overflow-hidden text-white">
      <div data-hero-image className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Royal Priesthood Embassy worship gathering"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/70 via-obsidian-900/40 to-obsidian-900/85" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <p
            data-hero-line
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300"
          >
            {site.scripture}
          </p>
          <h1
            data-hero-line
            className="font-display text-4xl leading-[1.1] tracking-tight text-shadow md:text-6xl lg:text-[3.5rem]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
          >
            {site.tagline}
          </h1>
          <p
            data-hero-line
            className="mt-6 max-w-2xl text-lg text-ivory-100/90 md:text-xl"
          >
            {site.description}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-8 sm:flex-row sm:items-center">
          <span data-hero-cta>
            <Button href="/visit" variant="gold">
              Plan Your Visit
            </Button>
          </span>
          <span data-hero-cta>
            <Button href="/give" variant="ghost">
              Give Online
            </Button>
          </span>
        </div>
      </div>
    </HeroAnimator>
  );
}
