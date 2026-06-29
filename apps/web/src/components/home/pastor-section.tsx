import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PastorSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Pastor
          </p>
          <h3 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            Charles Muchemi
          </h3>
        </ScrollReveal>
        <ScrollReveal>
          <div className="glass-frost card-hover flex flex-col overflow-hidden rounded-2xl md:flex-row">
            {/* Left — Image */}
            <div className="relative min-h-[400px] w-full md:min-h-[440px] md:w-5/12 lg:w-2/5">
              <Link
                href="/about"
                className="block h-full w-full"
              >
                <Image
                  src="/images/team/charles-muchemi.jpg"
                  alt="Pastor Charles Muchemi"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </Link>
            </div>

            {/* Right — Content */}
            <div className="flex flex-1 flex-col px-6 py-10 md:px-10">
              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed text-lg md:text-xl">
                  We believe that you are not an accident. You are God breathed,
                  intended by God, created for and through Him. God put you on this
                  earth to make a difference, there is a purpose and a call on your
                  life. But you can only discover that purpose in His presence. Love
                  God, love His people and watch how God will unfold His blessing
                  over your life.
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href="/about"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-600"
                >
                  Learn more about RP &rarr;
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
