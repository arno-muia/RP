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
        "fixed inset-0 z-40 bg-cream transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24 md:px-12">
        <nav className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-1">
            {navLinks.primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block font-serif text-4xl leading-tight text-stone-900 transition-opacity hover:opacity-60 md:text-5xl"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Ministries
            </p>
            {navLinks.ministries.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block text-base text-stone-700 hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Connect
              </p>
              {navLinks.connect.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block text-base text-stone-700 hover:text-stone-900"
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
                  className="text-sm uppercase tracking-widest text-stone-600 hover:text-stone-900"
                >
                  {network}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
