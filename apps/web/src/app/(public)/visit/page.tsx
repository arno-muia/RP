import { PageHero } from "@/components/shared/page-hero";
import { ServiceTimesGrid } from "@/components/shared/service-times-grid";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { RsvpForm } from "@/components/forms/rsvp-form";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { getServiceTimes, getVisitFaqs } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Plan Your Visit",
  description:
    "Plan your visit to Royal Priesthood Embassy in Thika. Service times, location, what to expect, FAQs, and RSVP.",
  path: "/visit",
});

const MAP_EMBED =
  "https://maps.google.com/maps?q=Voice+of+Grace+Behind+Spoonzoom+Thika+Kenya&output=embed";

const visitSteps = [
  {
    step: "Arrive",
    desc: "Our hospitality team will greet you at the door and help you find a seat.",
  },
  {
    step: "Worship",
    desc: "Experience authentic, Spirit-led worship that draws you into God's presence.",
  },
  {
    step: "Teaching",
    desc: "Receive practical, Bible-based teaching on your royal identity in Christ.",
  },
  {
    step: "Community",
    desc: "Connect with others after service — we'd love to meet you personally.",
  },
];

export default async function VisitPage() {
  const services = await getServiceTimes();
  const faqs = await getVisitFaqs();

  return (
    <>
      <PageHero
        title="You're Welcome Here"
        subtitle="Everything you need to know for your first visit to Royal Priesthood Embassy in Thika, Kenya."
        register="warm"
      />

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              Service Schedule
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Join us at any of our weekly gatherings — in person in Thika or online from anywhere.
            </p>
          </ScrollReveal>
          <ScrollReveal stagger={0.1} className="mt-10">
            <ServiceTimesGrid services={services} />
          </ScrollReveal>
        </div>
      </section>

      <section className="register-parchment section-padding">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <Image
                  src={images.visitWelcome}
                  alt="Royal Priesthood Embassy community gathering in Thika"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-3xl text-foreground md:text-4xl">Location</h2>
              <p className="mt-4 text-lg font-semibold text-foreground">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </p>
              <p className="mt-4 text-muted-foreground">
                We meet at Voice of Grace, behind Spoonzoom in Thika. Look for the hospitality
                team at the entrance — they will guide you to parking and seating.
              </p>
              <Button href={site.address.mapsUrl} variant="primary" external className="mt-6">
                Get Directions
              </Button>
            </ScrollReveal>
          </div>
          <ScrollReveal className="mt-10 overflow-hidden rounded-xl border border-primary/20">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Priesthood Embassy location map"
              className="aspect-video w-full"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              What to Expect
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={0.1} className="mt-10 space-y-6">
            {visitSteps.map((item, i) => (
              <li key={item.step} className="flex list-none gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-data text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{item.step}</h3>
                  <p className="mt-1 text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="register-parchment section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal className="mt-10">
            <FaqAccordion faqs={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className="register-celestial section-padding" id="rsvp">
        <div className="mx-auto max-w-xl px-5 md:px-8">
          <ScrollReveal>
            <RsvpForm />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <ScrollReveal className="glass-gold mx-auto max-w-2xl rounded-2xl px-5 py-12 text-center md:px-8">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            I&apos;m Coming This Sunday
          </h2>
          <p className="mt-4 text-muted-foreground">
            Questions before you visit? Reach out — we&apos;re happy to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#rsvp" variant="primary">
              Submit RSVP
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
