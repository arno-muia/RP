"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-burgundy/10 bg-cream/95 shadow-sm backdrop-blur-md"
            : "border-b border-white/10 bg-burgundy/20 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/"
            className={cn(
              "font-display text-xl uppercase tracking-wider md:text-2xl",
              scrolled ? "text-burgundy" : "text-white",
            )}
          >
            {site.shortName}
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  scrolled ? "text-charcoal" : "text-white/90",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/visit"
              variant={scrolled ? "primary" : "alternate"}
              className="hidden sm:inline-flex"
            >
              Plan Your Visit
            </Button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "group flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border",
                scrolled ? "border-burgundy/30 text-burgundy" : "border-white/30 text-white",
              )}
            >
              <span
                className={cn(
                  "h-0.5 w-5 transition-transform",
                  scrolled ? "bg-burgundy" : "bg-white",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 transition-opacity",
                  scrolled ? "bg-burgundy" : "bg-white",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 transition-transform",
                  scrolled ? "bg-burgundy" : "bg-white",
                  menuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
