import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";

export default function AdminPage() {
  return (
    <>
      <PageHero
        title="Content Admin"
        subtitle="Protected content management interface — Phase 2 implementation."
        register="parchment"
      />
      <section className="section-padding register-celestial bg-white">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <p className="text-muted">
            The JSON-based CMS admin interface for managing sermons, events, leadership
            bios, and homepage content will be available in the next phase. Content is
            currently managed via JSON files in the <code className="text-burgundy">content/</code> directory.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Sermons", href: "/admin/sermons" },
              { label: "Events", href: "/admin/events" },
              { label: "Content Blocks", href: "/admin/content" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-burgundy/10 p-4 text-burgundy hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
