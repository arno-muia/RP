import Link from "next/link";

const opsNav = [
  { href: "/ops", label: "Overview" },
  { href: "/ops/check-in", label: "Check-in" },
  { href: "/ops/members", label: "Members" },
  { href: "/ops/reports", label: "Reports" },
] as const;

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-stone-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/ops" className="font-serif text-xl">
            Ministry Ops
          </Link>
          <nav className="hidden gap-6 md:flex">
            {opsNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-stone-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">{children}</div>
    </div>
  );
}
