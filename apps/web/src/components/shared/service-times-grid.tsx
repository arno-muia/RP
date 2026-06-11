import Image from "next/image";
import type { ServiceTime } from "@/types";
import { Monitor, MapPin } from "lucide-react";

type ServiceTimesGridProps = {
  services: ServiceTime[];
  variant?: "cards" | "compact";
};

export function ServiceTimesGrid({ services, variant = "cards" }: ServiceTimesGridProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <div key={service.name} className="rounded-xl border border-burgundy/10 bg-white px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">{service.day}</p>
            <p className="font-semibold text-burgundy">{service.name}</p>
            <p className="text-sm text-muted">{service.time}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <article
          key={service.name}
          className="card-hover overflow-hidden rounded-xl border border-burgundy/10 bg-white shadow-sm"
        >
          {service.image && (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {service.day} · {service.time}
                </p>
                <h3 className="mt-1 text-xl font-bold text-burgundy">{service.name}</h3>
              </div>
              {service.platform === "online" ? (
                <Monitor className="h-5 w-5 shrink-0 text-gold" aria-label="Online service" />
              ) : (
                <MapPin className="h-5 w-5 shrink-0 text-gold" aria-label="Physical service" />
              )}
            </div>
            {service.location && (
              <p className="text-sm font-medium text-charcoal">{service.location}</p>
            )}
            {service.description && (
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            )}
            {service.link && (
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-burgundy hover:text-burgundy-light"
              >
                Join Online →
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
