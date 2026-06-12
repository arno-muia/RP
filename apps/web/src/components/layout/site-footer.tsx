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
    <footer className="bg-charcoal text-stone-300">
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
            <p className="font-accent text-lg text-gold">{site.tagline}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Location</p>
              <p className="mt-2 text-stone-300">
                {site.address.street}<br />{site.address.city}, {site.address.country}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Service Times</p>
              <ul className="mt-2 space-y-1 text-sm text-stone-400">
                {serviceTimes.map((s) => (
                  <li key={s.name}>{s.day} · {s.name} · {s.time}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">M-Pesa Giving</p>
              <p className="mt-2 text-sm text-stone-400">Till {site.giving.mpesaTill} · {site.giving.accountName}</p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{column.title}</p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-stone-400 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {Object.entries(site.social).map(([network, href]) => (
              <a key={network} href={href} target="_blank" rel="noopener noreferrer" className="text-sm capitalize text-stone-500 hover:text-gold">
                {network}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
