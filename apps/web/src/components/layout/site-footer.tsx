import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getServiceTimes } from "@/lib/content";
import { navLinks, site } from "@/lib/site";

const footerColumns = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Statement of Faith", href: "/about#beliefs" },
      { label: "2026 Theme", href: "/about#theme" },
    ],
  },
  { title: "Media", links: [...navLinks.media] },
  {
    title: "Connect",
    links: [
      { label: "Plan Your Visit", href: "/visit" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "Prayer Request", href: "/prayer" },
      { label: "Give", href: "/give" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export async function SiteFooter() {
  const serviceTimes = await getServiceTimes();

  return (
    <footer className="border-t border-border bg-ivory-100">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <img
              src="/rp-logo.svg"
              alt={site.name}
              width={220}
              height={56}
              className="h-12 w-auto"
            />
            <p className="font-display text-lg text-primary">{site.tagline}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Location
              </p>
              <p className="mt-2 text-muted-foreground">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Service Times
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {serviceTimes.map((s) => (
                  <li key={s.name}>
                    {s.day} · {s.name} · {s.time}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-gold rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                M-Pesa Giving
              </p>
              <p className="mt-2 font-data text-2xl text-foreground">
                {site.giving.mpesaTill}
              </p>
              <p className="text-sm text-muted-foreground">{site.giving.accountName}</p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {column.title}
                </p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(site.social).map(([network, href]) => (
              <a
                key={network}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize text-muted-foreground transition-colors hover:text-primary"
              >
                {network}
              </a>
            ))}
            <ThemeToggle compact />
          </div>
        </div>
      </div>
    </footer>
  );
}
