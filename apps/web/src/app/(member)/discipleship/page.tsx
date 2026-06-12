import Link from "next/link";
import { site } from "@/lib/site";
import { ExternalLink } from "lucide-react";

export default function DiscipleshipPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl text-foreground">Discipleship Progress</h1>
      <div className="glass-frost rounded-xl p-6">
        <p className="text-muted-foreground">
          Track your Kingdom Formation modules and lesson progress at the Academy.
        </p>
        <Link
          href={site.academyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold-600"
        >
          Continue at Academy <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
