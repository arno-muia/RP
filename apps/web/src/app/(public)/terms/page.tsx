import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of service for the Royal Priesthood Embassy website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" register="parchment" />

      <section className="section-padding register-celestial bg-white">
        <div className="prose prose-stone mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-sm text-muted">Last updated: June 12, 2026</p>

          <h2 className="font-display mt-8 text-2xl uppercase text-burgundy">Acceptance</h2>
          <p className="mt-4 text-muted">
            By accessing and using the {site.name} website, you accept and agree to be
            bound by these Terms of Service.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-burgundy">Use of Content</h2>
          <p className="mt-4 text-muted">
            Sermon recordings, teaching materials, and website content are the property
            of {site.name}. You may share links to our content for personal, non-commercial
            use. Reproduction or distribution without permission is prohibited.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-burgundy">User Submissions</h2>
          <p className="mt-4 text-muted">
            By submitting contact forms, prayer requests, or other communications, you
            grant us permission to use that information to respond to you and provide
            ministry services as described in our Privacy Policy.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-burgundy">Disclaimer</h2>
          <p className="mt-4 text-muted">
            This website is provided &quot;as is&quot; without warranties of any kind.
            We strive for accuracy in service times and event information but recommend
            confirming details via our contact channels before visiting.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-burgundy">Contact</h2>
          <p className="mt-4 text-muted">
            Questions about these terms: {site.contact.email}
          </p>
        </div>
      </section>
    </>
  );
}
