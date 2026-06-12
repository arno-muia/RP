import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getWelcomeMessage } from "@/lib/content";

export async function WelcomeSection() {
  const welcome = await getWelcomeMessage();

  return (
    <section className="register-parchment section-padding">
      <ScrollReveal className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          From Our Leader
        </p>
        <h2 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
          {welcome.title}
        </h2>
        <blockquote className="mt-8 text-lg leading-relaxed text-foreground md:text-xl">
          &ldquo;{welcome.message}&rdquo;
        </blockquote>
        <p className="mt-6 font-semibold text-primary">— {welcome.author}</p>
      </ScrollReveal>
    </section>
  );
}
