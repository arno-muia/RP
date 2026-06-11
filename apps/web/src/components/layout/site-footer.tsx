import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/site";

const footerColumns = [
  {
    title: "Resources",
    links: [
      { label: "About", href: "/about" },
      { label: "New Here?", href: "/visit" },
      { label: "Next Steps", href: "/next-steps" },
      { label: "Sermons", href: "/sermons" },
      { label: "Care", href: "/care" },
      { label: "Give", href: "/giving" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Small Groups", href: "/groups" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ministries",
    links: navLinks.ministries.map((item) => ({
      label: item.label,
      href: item.href,
    })),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-6">
            <p className="font-serif text-3xl text-white">{site.shortName}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Sunday Services
              </p>
              <p className="mt-2 text-stone-300">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </p>
            </div>
            <Button href="/subscribe" variant="small">
              Stay Connected
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {column.title}
                </p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-stone-500">
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
