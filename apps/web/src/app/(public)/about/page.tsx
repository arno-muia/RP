import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getBeliefs, getLeadership, getValues, getSiteConfig } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "About",
  description: "Learn about Royal Priesthood Embassy — our story, beliefs, values, and leadership team in Thika, Kenya.",
  path: "/about",
});

export default async function AboutPage() {
  const beliefs = await getBeliefs();
  const values = await getValues();
  const leaders = await getLeadership();
  const siteConfig = await getSiteConfig();
  const themeImage = siteConfig.theme2026.image ?? images.theme2026;

  function leaderInitials(name: string) {
    return name
      .split(" ")
      .filter((part) => part.length > 1 && !["Pastor", "Pst."].includes(part))
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return (
    <>
      <PageHero
        title="We Are Royal Priesthood Embassy"
        subtitle="A Kingdom Embassy in Thika, Kenya — equipping believers to establish heaven on earth through worship, discipleship, and authentic relationships."
        register="warm"
        scripture={site.scripture}
      />

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="font-display text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Our Story
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal">
            <p>
              Royal Priesthood Embassy was founded with a vision to raise a generation deeply
              rooted in the Word of God and fully committed to following Christ alone. What
              began as a gathering of believers hungry for Kingdom truth has grown into a
              vibrant embassy community in Thika, Kenya.
            </p>
            <p>
              We are not merely a church — we are a Kingdom Embassy. When you enter our
              space, you enter a realm where the laws of this place are not Kenya&apos;s laws.
              We exist to equip ambassadors who carry the culture of heaven into every sphere
              of daily influence.
            </p>
            <p>{site.description}</p>
          </div>
        </div>
      </section>

      <section id="beliefs" className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Statement of Faith
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief) => (
              <article
                key={belief.id}
                className="rounded-xl border border-burgundy/10 p-6"
              >
                <h3 className="text-lg font-bold text-burgundy">{belief.title}</h3>
                <p className="mt-2 text-sm text-muted">{belief.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Our Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            The Mantle, Rod, and Sword — Identity, Authority, and Execution
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.id}
                className="card-hover rounded-xl border border-burgundy/10 bg-white p-8 text-center"
              >
                <h3 className="font-display text-2xl uppercase tracking-wide text-burgundy">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Leadership Team
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {leaders.map((leader) => (
              <article key={leader.id} className="text-center">
                {leader.photo ? (
                  <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full">
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-burgundy/10">
                    <span className="font-display text-4xl text-burgundy">
                      {leaderInitials(leader.name)}
                    </span>
                  </div>
                )}
                <h3 className="mt-4 font-bold text-burgundy">{leader.name}</h3>
                <p className="text-sm font-medium text-gold">{leader.role}</p>
                <p className="mt-2 text-sm text-muted">{leader.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="theme" className="relative overflow-hidden section-padding register-warm">
        <Image
          src={themeImage}
          alt="The Latter Rain — 2026 theme"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-burgundy/80" />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            2026 Theme
          </p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-white md:text-5xl">
            {site.theme2026.title}
          </h2>
          <p className="font-accent mt-4 text-2xl text-gold">{site.theme2026.scripture}</p>
          <p className="mt-6 text-lg text-white/85">{site.theme2026.scriptureText}</p>
          <div className="mt-8">
            <Button href="/visit" variant="gold">Join Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
