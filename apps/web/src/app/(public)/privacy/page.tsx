import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Royal Priesthood Embassy website. Kenya Data Protection Act compliance.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" register="parchment" />

      <section className="register-celestial section-padding">
        <div className="prose prose-stone mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-sm text-muted-foreground">Last updated: June 12, 2026</p>

          <h2 className="font-display mt-8 text-2xl uppercase text-primary">Introduction</h2>
          <p className="mt-4 text-muted-foreground">
            {site.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
            This policy explains how we collect, use, and safeguard your personal data in
            compliance with the Kenya Data Protection Act, 2019.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-primary">Data We Collect</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Contact information (name, email, phone) when you submit forms</li>
            <li>Prayer requests and messages you voluntarily provide</li>
            <li>Analytics data (pages visited, device type) via Google Analytics</li>
            <li>Cookies for site functionality and analytics</li>
          </ul>

          <h2 className="font-display mt-8 text-2xl uppercase text-primary">How We Use Your Data</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>To respond to your inquiries and prayer requests</li>
            <li>To send newsletter updates (with your consent)</li>
            <li>To improve our website and ministry services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="font-display mt-8 text-2xl uppercase text-primary">Your Rights</h2>
          <p className="mt-4 text-muted-foreground">
            Under the Kenya Data Protection Act, you have the right to access, correct,
            delete, or restrict processing of your personal data. Contact us at{" "}
            <a href={`mailto:${site.contact.email}`} className="text-primary">
              {site.contact.email}
            </a>{" "}
            to exercise these rights.
          </p>

          <h2 className="font-display mt-8 text-2xl uppercase text-primary">Contact</h2>
          <p className="mt-4 text-muted-foreground">
            For data protection inquiries: {site.contact.email}
          </p>
        </div>
      </section>
    </>
  );
}
