import { createFileRoute } from "@tanstack/react-router";
import { Gem, HeartHandshake, Leaf, Sparkles } from "lucide-react";

import assistant from "@/assets/memoji-assistant.webp";
import { BookButton } from "@/components/site/BookButton";
import { Flower, Heart, Sparkle, Swirl } from "@/components/site/Doodles";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos · GiglowSpa" },
      {
        name: "description",
        content: "En GiglowSpa realzamos tu belleza natural con tratamientos estéticos modernos y personalizados, en un ambiente relajante pensado en ti.",
      },
      { property: "og:title", content: "Quiénes Somos · GiglowSpa" },
      { property: "og:description", content: "Realzamos tu belleza natural con tratamientos estéticos modernos y personalizados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: HeartHandshake, label: "Confianza" },
  { icon: Leaf, label: "Bienestar" },
  { icon: Sparkles, label: "Resultados visibles" },
  { icon: Gem, label: "Atención profesional" },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero px-5 pb-12 pt-16">
        <Swirl className="absolute right-8 top-10 hidden h-14 w-36 text-accent/50 md:block" />
        <Reveal>
          <SectionHeading as="h1" eyebrow="Nuestra esencia" title="Quiénes" script="Somos" />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 animate-blob bg-gradient-soft shadow-card" />
          <img src={assistant} alt="Memoji de la especialista de GiglowSpa" className="relative z-10 w-full animate-float object-contain" />
          <Sparkle className="absolute left-2 top-4 z-20 h-7 w-7 text-primary" />
          <Heart className="absolute -right-2 bottom-20 z-20 h-9 w-9 animate-float-slow text-accent" />
          <Flower className="absolute -left-4 bottom-6 z-20 h-12 w-12 text-blush" />
        </Reveal>

        <Reveal delay={150}>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="font-display text-3xl leading-snug text-foreground sm:text-4xl">
              En GiglowSpa nos dedicamos a realzar tu <span className="font-script text-primary">belleza natural</span> mediante
              tratamientos estéticos modernos y personalizados.
            </p>
            <p>
              Nuestro compromiso es brindarte confianza, bienestar y resultados visibles, utilizando técnicas como mesoterapia,
              reductivos, faciales, peptonas y micropuntura.
            </p>
            <p>
              Cada cliente es especial para nosotros, por eso ofrecemos atención profesional y un ambiente relajante pensado en ti.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {VALUES.map((v, i) => (
              <div
                key={v.label}
                className="flex flex-col items-center gap-2 rounded-3xl bg-card p-4 text-center shadow-soft transition-transform duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                  <v.icon className="h-5 w-5" />
                </span>
                <span className="text-sm text-foreground">{v.label}</span>
              </div>
            ))}
          </div>
          <BookButton size="xl" className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}
