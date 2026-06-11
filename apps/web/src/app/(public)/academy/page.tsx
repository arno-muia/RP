import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getAcademyModules } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Kingdom Formation Academy",
  description: "Discover Kingdom Formation — the discipleship system of Royal Priesthood Embassy. 6 modules to discover your true identity in Christ.",
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

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={images.academyHero}
              alt="Kingdom Formation — Tuesday discipleship gathering"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-burgundy">
            What is Kingdom Formation?
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal">
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
        </div>
      </section>

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy">
            Module Catalog
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <article
                key={mod.id}
                className="card-hover rounded-xl border border-burgundy/10 bg-white p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Module {mod.order}
                </span>
                <h3 className="mt-2 text-xl font-bold text-burgundy">{mod.title}</h3>
                <p className="mt-2 text-sm text-muted">{mod.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>{mod.instructor}</span>
                  <span>{mod.lessonsCount} lessons · {mod.duration}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding register-warm text-center">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <h2 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
            Begin Your Journey
          </h2>
          <p className="mt-4 text-white/80">
            Enroll in Kingdom Formation Academy to access all modules, track your progress,
            and join a community of learners.
          </p>
          <div className="mt-8">
            <Button href={site.academyUrl} variant="gold" external>
              Enroll at Academy
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
