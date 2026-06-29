"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, MapPin } from "lucide-react";
import type { ServiceTime } from "@/types";

type ServiceTimesCarouselProps = {
  services: ServiceTime[];
};

const TAB_ORDER = [
  "Sunday Online Service",
  "Saturday Physical Service",
  "Kingdom Formation",
  "Thursday Partner's Meeting",
  "Cell Group Meetings",
];

export function ServiceTimesCarousel({ services }: ServiceTimesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Map the incoming services to the tab order, matching by name directly
  const orderedServices = TAB_ORDER.map((tabName) =>
    services.find((s) => s.name === tabName) ?? null,
  ).filter(Boolean) as ServiceTime[];

  const current = orderedServices[activeIndex];

  if (!current || orderedServices.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Tab Navigation Bar */}
      <div className="mb-8 flex overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm">
        {orderedServices.map((service, i) => (
          <button
            key={service.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`relative flex-1 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors duration-200 md:px-4 md:text-sm ${
              i === activeIndex
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {i === activeIndex && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 border-b-2 border-primary bg-primary/5"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {/* Shorten names on mobile */}
              <span className="hidden sm:inline">{service.name}</span>
              <span className="sm:hidden">
                {service.name === "Sunday Online Service"
                  ? "Sunday"
                  : service.name === "Saturday Physical Service"
                    ? "Saturday"
                    : service.name === "Kingdom Formation"
                      ? "Formation"
                      : service.name === "Thursday Partner's Meeting"
                        ? "Partners"
                        : "Cell Group"}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Card Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
        >
          {/* Image */}
          {current.image && (
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          )}

          {/* Details - centered */}
          <div className="border-t border-border p-5 text-center md:p-6">
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {current.day} · {current.time}
              </p>
              <h3 className="mt-1 font-display text-xl text-foreground md:text-2xl">
                {current.name}
              </h3>
            </div>

            {current.location && (
              <p className="text-sm font-medium text-foreground">
                {current.location}
              </p>
            )}

            {current.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {current.description}
              </p>
            )}

            {current.link && (
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-primary transition-colors hover:text-gold-600"
              >
                Join Online →
              </a>
            )}

            <div className="mt-4 flex justify-center">
              {current.platform === "online" ? (
                <Monitor
                  className="h-5 w-5 text-primary"
                  aria-label="Online service"
                />
              ) : (
                <MapPin
                  className="h-5 w-5 text-primary"
                  aria-label="Physical service"
                />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      {orderedServices.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {orderedServices.map((service, i) => (
            <button
              key={service.name}
              type="button"
              aria-label={`Show ${service.name}`}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}