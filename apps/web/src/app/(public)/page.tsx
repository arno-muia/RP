import { HeroSection } from "@/components/home/hero-section";
import { ServiceTimesSection } from "@/components/home/service-times-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import { SermonSection } from "@/components/home/sermon-section";
import { EventsSection } from "@/components/home/events-section";
import { WhatToExpectSection } from "@/components/home/what-to-expect-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaBannerSection } from "@/components/home/cta-banner-section";
import { churchSchema } from "@/lib/seo";

export default function HomePage() {
  const schema = churchSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroSection />
      <ServiceTimesSection />
      <WelcomeSection />
      <SermonSection />
      <EventsSection />
      <WhatToExpectSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
