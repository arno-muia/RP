import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getHeroImage } from "@/lib/content";
import { site } from "@/lib/site";

export async function HeroSection() {
  const heroImage = await getHeroImage();

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <Image
        src={heroImage}
        alt="Royal Priesthood Embassy worship gathering"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-burgundy/40 to-burgundy/80" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <p className="font-accent mb-4 text-2xl text-gold md:text-3xl">{site.scripture}</p>
          <h1 className="font-display text-5xl uppercase leading-[1.05] tracking-wide md:text-7xl lg:text-8xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">{site.description}</p>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-8 sm:flex-row sm:items-center">
          <Button href="/visit" variant="gold">Plan Your Visit</Button>
          <Button href="/give" variant="ghost">Give Online</Button>
        </div>
      </div>
    </section>
  );
}
