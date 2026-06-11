"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-950/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-white md:text-2xl"
          >
            {site.shortName}
          </Link>

          <div className="flex items-center gap-3">
            <Button
              href="/visit"
              variant="alternate"
              className="hidden sm:inline-flex"
            >
              Visit
            </Button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/30 text-white"
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-white transition-transform",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-white transition-opacity",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-white transition-transform",
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
