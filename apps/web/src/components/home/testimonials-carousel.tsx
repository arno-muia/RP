"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/types";

export function TestimonialsCarousel({
  testimonials,
  sermonThumbnail,
}: {
  testimonials: Testimonial[];
  sermonThumbnail: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const photoSrc = current.photo || sermonThumbnail;

  return (
    <div className="relative mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          className="glass-frost rounded-2xl p-8 text-center md:p-12"
        >
          <blockquote className="text-lg leading-relaxed text-foreground md:text-xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <footer className="mt-6">
            {photoSrc && (
              <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30">
                <Image
                  src={photoSrc}
                  alt={current.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <p className="font-semibold text-primary">{current.name}</p>
            {current.role && (
              <p className="text-sm text-muted-foreground">{current.role}</p>
            )}
          </footer>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show testimony ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
