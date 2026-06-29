"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const HERO_THRESHOLD_PX = 100; // how far below the hero section the navbar stays hidden on scroll-up

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY <= 0) {
        // At the very top — always show
        setHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide
        setHidden(true);
      } else {
        // Scrolling up — keep hidden unless we're back near the top (hero section)
        if (currentScrollY <= HERO_THRESHOLD_PX) {
          setHidden(false);
        }
        // otherwise stay hidden (don't change state)
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-gold-500 shadow-md" : "bg-gold-500",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src="/rp-logo.svg"
              alt={site.name}
              width={180}
              height={48}
              className={cn(
                "h-10 w-auto md:h-11",
                "brightness-0 invert",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {navLinks.primary
              .filter((link) => link.label !== "Academy")
              .map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200",
                    "text-white/90 hover:text-white",
                    active && "text-white",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "group flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors",
                "border-white/30 text-white",
              )}
            >
              <span
                className={cn(
                  "h-0.5 w-5 transition-transform bg-current",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 transition-opacity bg-current",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 transition-transform bg-current",
                  menuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenuOverlay onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  const linkVariants = {
    hidden: { opacity: 0, x: 40 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-40 bg-obsidian-900/95 backdrop-blur-xl"
      aria-hidden={false}
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24 md:px-12">
        <nav className="grid gap-10 lg:grid-cols-2" aria-label="Mobile">
          <div className="space-y-2">
            {navLinks.primary.map((link, i) => (
              <motion.div key={link.href} custom={i} variants={linkVariants} initial="hidden" animate="show">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-display text-4xl text-ivory-25 transition-opacity hover:text-gold-400 md:text-5xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link
                href="/visit"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-gold-500 to-bronze-500 px-6 py-3 text-sm font-semibold text-white shadow-gold transition-all hover:-translate-y-0.5"
              >
                Plan Your Visit
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <Link
                href="/login"
                onClick={onClose}
                className="text-sm text-ivory-400 hover:text-gold-400"
              >
                Sign In →
              </Link>
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
