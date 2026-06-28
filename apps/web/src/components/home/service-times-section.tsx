import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getServiceTimes } from "@/lib/content";
import { ServiceTimesGrid } from "@/components/shared/service-times-grid";

export async function ServiceTimesSection() {
  const services = await getServiceTimes();

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Join Us
          </p>
          <h2 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            Service Times
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Whether you join us in Thika or online from anywhere in the world, there is a gathering for you.
          </p>
        </ScrollReveal>
        <ScrollReveal stagger={0.1}>
          <ServiceTimesGrid services={services} />
        </ScrollReveal>
      </div>
    </section>
  );
}
