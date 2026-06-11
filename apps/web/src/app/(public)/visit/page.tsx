import { PageHero } from "@/components/shared/page-hero";
import { ServiceTimesGrid } from "@/components/shared/service-times-grid";
import { Button } from "@/components/ui/button";
import { getServiceTimes, getVisitFaqs } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Plan Your Visit",
  description: "Plan your visit to Royal Priesthood Embassy in Thika. Service times, location, what to expect, and FAQs.",
  path: "/visit",
});

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

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Service Schedule
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Join us at any of our weekly gatherings — in person in Thika or online from anywhere.
          </p>
          <div className="mt-10">
            <ServiceTimesGrid services={services} />
          </div>
        </div>
      </section>

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={images.visitWelcome}
                alt="Royal Priesthood Embassy community gathering in Thika"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
                Location
              </h2>
              <p className="mt-4 text-lg font-semibold text-charcoal">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </p>
              <p className="mt-4 text-muted">
                We meet at Voice of Grace, behind Spoonzoom in Thika. Look for the
                hospitality team at the entrance — they will guide you to parking and
                seating.
              </p>
              <Button href={site.address.mapsUrl} variant="primary" external>
                Get Directions
              </Button>
            </div>
          </div>
          <div className="mt-10 aspect-video overflow-hidden rounded-xl bg-burgundy/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5!2d37.069!3d-1.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDInMDAuMCJTIDM3JzA0LjQiRQ!5e0!3m2!1sen!2ske!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Priesthood Embassy location map"
            />
          </div>
        </div>
      </section>

      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            What to Expect
          </h2>
          <ol className="mt-10 space-y-6">
            {[
              { step: "Arrive", desc: "Our hospitality team will greet you at the door and help you find a seat." },
              { step: "Worship", desc: "Experience authentic, Spirit-led worship that draws you into God's presence." },
              { step: "Teaching", desc: "Receive practical, Bible-based teaching on your royal identity in Christ." },
              { step: "Community", desc: "Connect with others after service — we'd love to meet you personally." },
            ].map((item, i) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-burgundy">{item.step}</h3>
                  <p className="mt-1 text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding register-parchment">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="font-display text-center text-3xl uppercase tracking-wide text-burgundy md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-burgundy/10 bg-white p-6"
              >
                <summary className="cursor-pointer font-semibold text-burgundy marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding register-warm text-center">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <h2 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
            I&apos;m Coming This Sunday
          </h2>
          <p className="mt-4 text-white/80">
            Let us know you&apos;re coming so our hospitality team can prepare a warm welcome for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="gold">
              RSVP via Contact
            </Button>
            {site.contact.whatsapp && (
              <Button href={site.contact.whatsapp} variant="ghost" external>
                WhatsApp Us
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
