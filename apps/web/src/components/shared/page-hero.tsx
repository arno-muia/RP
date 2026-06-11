import { cn } from "@/lib/cn";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  register?: "celestial" | "parchment" | "warm";
  scripture?: string;
  className?: string;
};

export function PageHero({
  title,
  subtitle,
  register = "warm",
  scripture,
  className,
}: PageHeroProps) {
  const registerClass =
    register === "parchment"
      ? "register-parchment"
      : register === "celestial"
        ? "register-celestial"
        : "register-warm";

  return (
    <section
      className={cn(
        registerClass,
        "relative overflow-hidden section-padding",
        register === "warm" && "bg-burgundy text-white",
        register === "parchment" && "bg-cream",
        register === "celestial" && "bg-white",
        className,
      )}
    >
      <div className="relative mx-auto max-w-7xl px-5 text-center md:px-8">
        {scripture && (
          <p className="font-accent mb-4 text-xl text-gold md:text-2xl">{scripture}</p>
        )}
        <h1 className="font-display text-5xl uppercase tracking-wide md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg",
              register === "warm" ? "text-white/80" : "text-muted",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
