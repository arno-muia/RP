import { getTestimonials } from "@/lib/content";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="register-celestial section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Real Stories</p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-burgundy md:text-5xl">
            Testimonies
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="card-hover rounded-xl border border-burgundy/10 bg-cream p-8">
              <p className="font-accent text-lg leading-relaxed text-charcoal">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-burgundy">{t.name}</p>
                {t.role && <p className="text-sm text-muted">{t.role}</p>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
