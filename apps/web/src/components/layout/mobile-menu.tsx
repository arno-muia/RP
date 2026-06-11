"use client";

import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-burgundy transition-opacity duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24 md:px-12">
        <nav className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-2">
            {navLinks.primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block font-display text-4xl uppercase tracking-wide text-white transition-opacity hover:opacity-70 md:text-5xl"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Connect
              </p>
              {navLinks.connect.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block text-base text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex gap-4">
              {Object.entries(site.social).map(([network, href]) => (
                <a
                  key={network}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-white/60 hover:text-gold"
                >
                  {network}
                </a>
              ))}
            </div>

            <Link
              href="/visit"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-light"
            >
              Plan Your Visit
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
