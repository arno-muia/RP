import { HeroSection } from "@/components/home/hero-section";
import { ServiceTimesSection } from "@/components/home/service-times-section";
import { EventsCarouselSection } from "@/components/home/events-carousel-section";
import { WhatToExpectSection } from "@/components/home/what-to-expect-section";
import { LatestSermonSection } from "@/components/home/latest-sermon-section";
import { PastorSection } from "@/components/home/pastor-section";
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
      <EventsCarouselSection />
      <WhatToExpectSection />
      <LatestSermonSection />
      <TestimonialsSection />
      <PastorSection />
      <CtaBannerSection />
    </>
  );
}
