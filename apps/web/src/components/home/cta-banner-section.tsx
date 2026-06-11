import { Button } from "@/components/ui/button";
import { getServiceTimes } from "@/lib/content";
import { site } from "@/lib/site";

export async function CtaBannerSection() {
  const services = await getServiceTimes();
  const sundayService = services.find((s) => s.name === "Sunday Main Service");

  return (
    <section className="register-warm relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="font-accent text-2xl text-gold md:text-3xl">Join Us This Sunday</p>
        <h2 className="font-display mt-4 text-4xl uppercase tracking-wide text-white md:text-6xl">
          You&apos;re Invited
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
          Whether you are exploring faith, looking for a church home, or have walked with Jesus for years — we have a place for you in Thika.
        </p>
        {sundayService && (
          <p className="mt-4 text-gold">
            {sundayService.day} · {sundayService.time} · {site.address.street}, {site.address.city}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/visit" variant="gold">Plan Your Visit</Button>
          <Button href="/sermons" variant="ghost">Watch a Sermon</Button>
        </div>
      </div>
    </section>
  );
}
