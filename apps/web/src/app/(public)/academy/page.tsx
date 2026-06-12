import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getAcademyModules } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Kingdom Formation Academy",
  description:
    "Discover Kingdom Formation — the discipleship system of Royal Priesthood Embassy. 6 modules to discover your true identity in Christ.",
  path: "/academy",
});

export default async function AcademyPage() {
  const modules = await getAcademyModules();

  return (
    <>
      <PageHero
        title="Kingdom Formation"
        subtitle="Discover Your True Identity — the discipleship system that equips ambassadors for daily Kingdom influence."
        register="parchment"
        scripture="Romans 8:29"
      />

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <ScrollReveal>
            <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-xl border border-border">
              <Image
                src={images.academyHero}
                alt="Kingdom Formation — Tuesday discipleship gathering"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <h2 className="font-display text-3xl text-foreground">
              What is Kingdom Formation?
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Kingdom Formation is the discipleship engine of Royal Priesthood Embassy.
                It is not a program you complete — it is a journey of transformation where
                believers discover their true identity as sons of God and learn to walk in
                daily Kingdom influence.
              </p>
              <p>
                Every Tuesday at 8:30 PM, we gather online for Blueprint Tuesdays — deep
                teaching and Holy Communion. The Academy extends this formation with structured
                modules you can study at your own pace.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="register-parchment section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-3xl text-foreground">Module Catalog</h2>
          </ScrollReveal>
          <ScrollReveal stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <article key={mod.id} className="card-hover glass-frost rounded-xl p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Module {mod.order}
                </span>
                <h3 className="mt-2 font-display text-xl text-foreground">{mod.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{mod.instructor}</span>
                  <span>{mod.lessonsCount} lessons · {mod.duration}</span>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <ScrollReveal className="glass-gold mx-auto max-w-2xl rounded-2xl px-5 py-12 text-center md:px-8">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            Begin Your Journey
          </h2>
          <p className="mt-4 text-muted-foreground">
            Enroll in Kingdom Formation Academy to access all modules, track your progress,
            and join a community of learners.
          </p>
          <div className="mt-8">
            <Button href={site.academyUrl} variant="primary" external>
              Enroll at Academy
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
