import { HeroSection } from "@/components/home/hero-section";
import { ServiceTimesSection } from "@/components/home/service-times-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import { TeachingEventsSection } from "@/components/home/teaching-events-section";
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
      <WelcomeSection />
      <ServiceTimesSection />
      <WhatToExpectSection />
      <TeachingEventsSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
