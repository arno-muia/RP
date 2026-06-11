import Link from "next/link";

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
    <div className="min-h-screen bg-cream">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/dashboard" className="font-serif text-xl text-stone-900">
            Member Portal
          </Link>
          <nav className="hidden gap-6 md:flex">
            {memberNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
            ← Public site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</div>
    </div>
  );
}
