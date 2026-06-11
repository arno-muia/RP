import { Music, BookOpen, Users, TrendingUp } from "lucide-react";
import { getWhatToExpect } from "@/lib/content";
import type { WhatToExpectItem } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  music: Music,
  "book-open": BookOpen,
  users: Users,
  "trending-up": TrendingUp,
};

export async function WhatToExpectSection() {
  const items = await getWhatToExpect();

  return (
    <section className="register-parchment section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">First Visit?</p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-burgundy md:text-5xl">
            What to Expect
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: WhatToExpectItem) => {
            const Icon = iconMap[item.icon] ?? Users;
            return (
              <article key={item.title} className="card-hover rounded-xl border border-burgundy/10 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10">
                  <Icon className="h-6 w-6 text-burgundy" />
                </div>
                <h3 className="text-lg font-bold text-burgundy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
