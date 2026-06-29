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
          <div
            key={service.name}
            className="glass-frost rounded-xl px-5 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {service.day}
            </p>
            <p className="font-semibold text-foreground">{service.name}</p>
            <p className="text-sm text-muted-foreground">{service.time}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-x-24 gap-y-8 md:grid-cols-2 lg:grid-cols-2">
      {services.map((service) => (
        <article
          key={service.name}
          className="card-hover overflow-hidden rounded-xl glass-frost"
        >
          {service.image && (
            <div className="relative aspect-[16/6] w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          <div className="border-t border-border p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {service.day} · {service.time}
                </p>
                <h3 className="mt-1 font-display text-xl text-foreground">
                  {service.name}
                </h3>
              </div>
              {service.platform === "online" ? (
                <Monitor className="h-5 w-5 shrink-0 text-primary" aria-label="Online service" />
              ) : (
                <MapPin className="h-5 w-5 shrink-0 text-primary" aria-label="Physical service" />
              )}
            </div>
            {service.location && (
              <p className="text-sm font-medium text-foreground">{service.location}</p>
            )}
            {service.description && (
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
            )}
            {service.link && (
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-primary transition-colors hover:text-gold-600"
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
