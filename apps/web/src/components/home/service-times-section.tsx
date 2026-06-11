import { getServiceTimes } from "@/lib/content";
import { ServiceTimesGrid } from "@/components/shared/service-times-grid";
import { Button } from "@/components/ui/button";

export async function ServiceTimesSection() {
  const services = await getServiceTimes();

  return (
    <section className="register-celestial section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Join Us</p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-burgundy md:text-5xl">
            Service Times
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Whether you join us in Thika or online from anywhere in the world, there is a gathering for you.
          </p>
        </div>
        <ServiceTimesGrid services={services} />
        <div className="mt-10 text-center">
          <Button href="/visit" variant="secondary">What to Expect</Button>
        </div>
      </div>
    </section>
  );
}
