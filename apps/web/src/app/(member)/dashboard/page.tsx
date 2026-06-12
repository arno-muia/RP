import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  Users,
  Heart,
  GraduationCap,
  Settings,
  Calendar,
  ExternalLink,
} from "lucide-react";

const quickLinks = [
  {
    title: "Household",
    description: "View and manage your household members",
    href: "/household",
    icon: Users,
  },
  {
    title: "Giving History",
    description: "Track your contributions and pledges",
    href: "/giving-history",
    icon: Heart,
  },
  {
    title: "Kingdom Formation",
    description: "Continue your discipleship journey",
    href: "https://rpacademy.vercel.app/",
    icon: GraduationCap,
    external: true,
  },
  {
    title: "Profile Settings",
    description: "Update your contact information",
    href: "/profile",
    icon: Settings,
  },
] as const;

export default async function MemberDashboardPage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0] ?? "Member";

  return (
    <div className="space-y-8">
      <div className="glass-gold rounded-2xl p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Member Portal
        </p>
        <h1 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
          Welcome back, {name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your embassy dashboard — quick access to ministry resources and account tools.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="glass-frost rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Service Attendance</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Attendance tracking is managed through RP OS. Full history coming soon.
          </p>
          <Link
            href="https://rpos.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold-600"
          >
            Open RP OS <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="glass-frost rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Cell Group</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Your cell group assignment and meeting schedule will appear here.
          </p>
        </div>
      </div>

      <div>
        <h2 className="font-display mb-4 text-xl text-foreground">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const content = (
              <div className="card-hover glass-frost flex h-full flex-col rounded-xl p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">{link.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  {link.description}
                </p>
                {"external" in link && link.external && (
                  <ExternalLink className="mt-3 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );

            if ("external" in link && link.external) {
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={link.title} href={link.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
