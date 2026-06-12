"use client";

import { useEffect, useRef, type RefObject } from "react";
import { scrollReveal, type ScrollRevealOptions } from "@/lib/animations";

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tween = scrollReveal(ref.current, options);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [options]);

  return ref;
}
