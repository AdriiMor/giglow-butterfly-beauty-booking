import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarHeart, Flower2, HeartHandshake, MessageCircleHeart, Sparkles, Wand2 } from "lucide-react";

import { AssistantWelcome } from "@/components/site/AssistantWelcome";
import { BookButton } from "@/components/site/BookButton";
import { Flower, Heart, Sparkle, Swirl } from "@/components/site/Doodles";
import { ButterflyMark } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiglowSpa · Tu belleza natural merece brillar" },
      {
        name: "description",
        content: "Tratamientos estéticos profesionales: mesoterapia, dermapen, faciales, peptonas, micropuntura y más. Agenda tu cita por WhatsApp.",
      },
      { property: "og:title", content: "GiglowSpa · Tu belleza natural merece brillar" },
      { property: "og:description", content: "Tratamientos estéticos modernos y personalizados. Agenda tu cita por WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PILLARS = [
  { icon: HeartHandshake, title: "Atención personalizada", text: "Escuchamos lo que buscas y diseñamos un plan pensado solo para ti." },
  { icon: Wand2, title: "Técnicas modernas", text: "Trabajamos con tratamientos actuales y productos de calidad profesional." },
  { icon: Flower2, title: "Ambiente relajante", text: "Un espacio tranquilo donde puedes desconectarte y consentirte." },
  { icon: Sparkles, title: "Resultados visibles", text: "Nuestro compromiso es que te veas y te sientas increíble." },
];

const STEPS = [
  { icon: Sparkles, title: "Elige tu tratamiento", text: "Explora nuestros servicios y descubre cuál es para ti." },
  { icon: MessageCircleHeart, title: "Escríbenos por WhatsApp", text: "Resolvemos tus dudas y apartamos tu horario." },
  { icon: CalendarHeart, title: "Vive tu momento glow", text: "Llega, relájate y déjate consentir." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <Swirl className="pointer-events-none absolute left-[42%] top-10 hidden h-16 w-40 text-accent/50 lg:block" />
        <Sparkle className="pointer-events-none absolute left-6 top-24 h-5 w-5 text-primary" />
        <Flower className="pointer-events-none absolute bottom-10 left-[38%] hidden h-10 w-10 animate-float-slow text-lilac md:block" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="text-center lg:text-left">
            <p className="eyebrow inline-flex items-center gap-2">
              <ButterflyMark className="h-5 w-5" /> Tratamientos estéticos profesionales
            </p>
            <h1 className="mt-6 text-5xl font-medium leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              Tu belleza natural
              <br />
              merece <span className="font-script text-6xl text-gradient sm:text-7xl lg:text-8xl">brillar</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Date el regalo de sentirte bien contigo. Tratamientos modernos, personalizados y con todo el cariño que mereces.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <BookButton size="xl" />
              <Button asChild variant="outlineSoft" size="xl">
                <Link to="/servicios">
                  Ver servicios <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> 8 tratamientos</span>
              <span className="h-4 w-px bg-border" />
              <span className="flex items-center gap-2"><Sparkle className="h-4 w-4 text-accent" /> Atención 1 a 1</span>
            </div>
          </div>
          <AssistantWelcome />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border/60 bg-card py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl italic text-secondary-foreground">
              {s.name} <ButterflyMark className="h-6 w-6" animated={false} />
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionHeading eyebrow="Nuestros servicios" title="Tratamientos para" script="consentirte" description="Rostro, cuerpo y bienestar: elige el tuyo y descubre todo lo que puede hacer por ti." />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <Link
                to="/servicios"
                className={cn(
                  "group flex flex-col items-center rounded-3xl p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-glow",
                  s.tone === "blush" ? "bg-blush/70" : "bg-lilac/70",
                )}
              >
                <img src={s.image} alt="" loading="lazy" className="h-28 w-28 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-36 sm:w-36" />
                <span className="mt-2 font-display text-lg leading-tight text-foreground sm:text-xl">{s.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="soft" size="pill">
            <Link to="/servicios">
              Conoce cada tratamiento <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative bg-gradient-soft py-24">
        <Sparkle className="absolute right-10 top-12 h-6 w-6 text-card" />
        <Heart className="absolute bottom-12 left-10 h-8 w-8 animate-float-slow text-card" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading eyebrow="¿Por qué GiglowSpa?" title="Cada clienta es" script="especial" />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="h-full rounded-3xl bg-card/85 p-7 shadow-card backdrop-blur transition-transform duration-500 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionHeading eyebrow="Así de fácil" title="Agenda en" script="3 pasos" />
        </Reveal>
        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-lilac md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow-soft">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-2xl font-medium text-foreground">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-6 py-16 text-center shadow-glow sm:px-16">
            <Sparkle className="absolute left-10 top-10 h-6 w-6 text-primary-foreground" />
            <Sparkle className="absolute bottom-10 right-16 h-4 w-4 text-primary-foreground" style={{ animationDelay: "1.2s" }} />
            <ButterflyMark className="mx-auto h-14 w-14 animate-float" />
            <p className="mx-auto mt-6 max-w-2xl font-display text-3xl italic leading-snug text-primary-foreground sm:text-4xl">
              “Cuidarte no es un lujo, es un acto de amor propio.”
            </p>
            <BookButton variant="light" size="xl" className="mt-9" label="Quiero agendar mi cita" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
