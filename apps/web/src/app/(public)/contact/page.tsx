import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Royal Priesthood Embassy in Thika, Kenya.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with questions, prayer requests, or to plan your visit."
        register="parchment"
      />
      <section className="register-celestial section-padding">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal className="space-y-8">
              <div>
                <h2 className="font-display text-lg text-primary">Email</h2>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-2 block text-muted-foreground transition-colors hover:text-primary"
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <h2 className="font-display text-lg text-primary">Location</h2>
                <p className="mt-2 text-muted-foreground">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </p>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-primary hover:text-gold-600"
                >
                  Get Directions →
                </a>
              </div>
              <div>
                <h2 className="font-display text-lg text-primary">Social Media</h2>
                <ul className="mt-2 space-y-2">
                  {Object.entries(site.social).map(([network, href]) => (
                    <li key={network}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize text-muted-foreground transition-colors hover:text-primary"
                      >
                        {network}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
