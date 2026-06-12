import { Music, BookOpen, Users, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
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
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            First Visit?
          </p>
          <h2 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            What to Expect
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger={0.1} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: WhatToExpectItem) => {
            const Icon = iconMap[item.icon] ?? Users;
            return (
              <article
                key={item.title}
                className="card-hover glass-frost rounded-xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
