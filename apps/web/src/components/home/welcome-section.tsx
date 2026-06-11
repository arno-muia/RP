import { getWelcomeMessage } from "@/lib/content";

export async function WelcomeSection() {
  const welcome = await getWelcomeMessage();

  return (
    <section className="register-parchment section-padding">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">From Our Leader</p>
        <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-burgundy md:text-5xl">
          {welcome.title}
        </h2>
        <blockquote className="mt-8 text-lg leading-relaxed text-charcoal md:text-xl">
          &ldquo;{welcome.message}&rdquo;
        </blockquote>
        <p className="mt-6 font-semibold text-burgundy">— {welcome.author}</p>
      </div>
    </section>
  );
}
