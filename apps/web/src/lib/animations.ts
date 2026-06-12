import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  registered = true;
}

export type ScrollRevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  children?: boolean;
  start?: string;
};

export function scrollReveal(
  element: HTMLElement,
  options: ScrollRevealOptions = {},
) {
  registerGsap();
  const {
    y = 30,
    opacity = 0,
    duration = 0.6,
    delay = 0,
    stagger = 0,
    children = false,
    start = "top 85%",
  } = options;

  const targets = children ? element.children : element;

  return gsap.from(targets, {
    y,
    opacity,
    duration,
    delay,
    stagger: stagger || undefined,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none none",
    },
  });
}
