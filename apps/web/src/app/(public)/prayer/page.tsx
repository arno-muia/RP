import { PageHero } from "@/components/shared/page-hero";
import { PrayerForm } from "@/components/forms/prayer-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Prayer Request",
  description: "Submit a prayer request to Royal Priesthood Embassy.",
  path: "/prayer",
});

export default function PrayerPage() {
  return (
    <>
      <PageHero
        title="Prayer Request"
        subtitle="We believe in the power of prayer. Share your request and our intercession team will stand with you."
        register="warm"
        scripture="James 5:16"
      />
      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <PrayerForm />
        </div>
      </section>
    </>
  );
}
