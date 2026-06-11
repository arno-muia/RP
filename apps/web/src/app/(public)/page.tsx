import { EventsSection } from "@/components/home/events-section";
import { HeroSection } from "@/components/home/hero-section";
import { MinistriesSection } from "@/components/home/ministries-section";
import { MissionSection } from "@/components/home/mission-section";
import { SermonSection } from "@/components/home/sermon-section";
import { VisitSection } from "@/components/home/visit-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <EventsSection />
      <MinistriesSection />
      <SermonSection />
      <VisitSection />
    </>
  );
}
