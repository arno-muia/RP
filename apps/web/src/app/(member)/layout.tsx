import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/site";

const memberNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/household", label: "Household" },
  { href: "/giving-history", label: "Giving" },
  { href: "/discipleship", label: "Discipleship" },
  { href: "/profile", label: "Profile" },
] as const;

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-light sticky top-0 z-30 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img
              src="/rp-logo.svg"
              alt={site.shortName}
              className="h-8 w-auto"
            />
            <span className="font-display text-lg text-foreground">Member Portal</span>
          </Link>
          <nav className="hidden gap-6 md:flex" aria-label="Member">
            {memberNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle compact />
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ← Public site
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</div>
    </div>
  );
}
