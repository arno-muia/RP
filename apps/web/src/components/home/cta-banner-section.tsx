import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getServiceTimes } from "@/lib/content";
import { site } from "@/lib/site";

export async function CtaBannerSection() {
  const services = await getServiceTimes();
  const sundayService = services.find((s) => s.name === "Sunday Main Service");

  return (
    <section className="section-padding">
      <ScrollReveal className="glass-gold mx-auto max-w-7xl rounded-2xl px-5 py-16 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Join Us This Sunday
        </p>
        <h2 className="font-display mt-4 text-3xl text-foreground md:text-5xl">
          You&apos;re Invited
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Whether you are exploring faith, looking for a church home, or have walked with Jesus for years — we have a place for you in Thika.
        </p>
        {sundayService && (
          <p className="mt-4 font-data text-primary">
            {sundayService.day} · {sundayService.time} · {site.address.street},{" "}
            {site.address.city}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/visit" variant="primary">
            Plan Your Visit
          </Button>
          <Button href="/sermons" variant="secondary">
            Watch a Sermon
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
