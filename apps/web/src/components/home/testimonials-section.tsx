import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { getTestimonials } from "@/lib/content";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="register-celestial section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Real Stories
          </p>
          <h2 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            Testimonies
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialsCarousel testimonials={testimonials} />
        </ScrollReveal>
      </div>
    </section>
  );
}
