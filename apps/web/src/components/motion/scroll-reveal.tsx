"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  stagger = 0,
  y = 30,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const targets = stagger > 0 ? ref.current.children : ref.current;
    gsap.from(targets, {
      y,
      opacity: 0,
      duration: 0.6,
      stagger: stagger || undefined,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [stagger, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

export function HeroAnimator({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const image = containerRef.current.querySelector("[data-hero-image]");
    const lines = containerRef.current.querySelectorAll("[data-hero-line]");
    const ctas = containerRef.current.querySelectorAll("[data-hero-cta]");

    if (image) {
      tl.from(image, { scale: 1.05, duration: 3, ease: "power2.out" }, 0);
    }
    if (lines.length) {
      tl.from(lines, { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, 0.2);
    }
    if (ctas.length) {
      tl.from(ctas, { scale: 0.9, opacity: 0, duration: 0.4, stagger: 0.1 }, 0.8);
    }
  }, []);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
