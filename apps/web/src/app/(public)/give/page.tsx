import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Give",
  description:
    "Give to Royal Priesthood Embassy. M-Pesa Till 8598004. Your generosity advances the Kingdom in Thika and beyond.",
  path: "/give",
});

export default function GivePage() {
  return (
    <>
      <PageHero
        title="Give"
        subtitle="Your generosity fuels community outreach, global missions, and the daily work of the Kingdom Embassy."
        register="warm"
        scripture="2 Corinthians 9:7"
      />

      <section className="register-celestial section-padding">
        <ScrollReveal className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="font-display text-3xl text-foreground">Theology of Giving</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We give because God first gave — generously, sacrificially, and with joy.
            Your giving is an act of worship and partnership in advancing the Gospel.
            Every contribution, whether large or small, makes a Kingdom impact in Thika
            and beyond.
          </p>
        </ScrollReveal>
      </section>

      <section className="register-parchment section-padding">
        <ScrollReveal className="mx-auto max-w-2xl px-5 md:px-8">
          <div className="glass-gold rounded-2xl p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              M-Pesa Giving
            </p>
            <p className="font-data mt-4 text-5xl tracking-wide text-foreground md:text-6xl">
              {site.giving.mpesaTill}
            </p>
            <p className="mt-2 text-muted-foreground">Till Number</p>
            <p className="mt-6 font-semibold text-foreground">{site.giving.accountName}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Go to M-Pesa → Lipa na M-Pesa → Buy Goods and Services → Enter Till Number
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary">
                Need Help Giving?
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-foreground">Where Your Giving Goes</h2>
          </ScrollReveal>
          <ScrollReveal stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { title: "Community Programs", pct: "35%", desc: "Local outreach and support in Thika" },
              { title: "Global Missions", pct: "30%", desc: "Church planting and missionary support" },
              { title: "Ministry Operations", pct: "25%", desc: "Facilities, media, and resources" },
              { title: "Benevolence Fund", pct: "10%", desc: "Emergency assistance for families in crisis" },
            ].map((item) => (
              <div key={item.title} className="glass-frost rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <span className="font-data text-2xl text-primary">{item.pct}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
