import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation } from "lucide-react";

import { BookButton } from "@/components/site/BookButton";
import { Heart, Sparkle, Swirl } from "@/components/site/Doodles";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/Icons";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  ADDRESS,
  INSTAGRAM_URL,
  INSTAGRAM_USER,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · GiglowSpa" },
      {
        name: "description",
        content: "Contáctanos por WhatsApp o Instagram @giglowspa. Estamos en Presas, Tezontepec de Aldama, Hidalgo.",
      },
      { property: "og:title", content: "Contacto · GiglowSpa" },
      { property: "og:description", content: "WhatsApp, Instagram y ubicación de GiglowSpa en Tezontepec de Aldama, Hidalgo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: WHATSAPP_DISPLAY, href: whatsappLink(), tone: "bg-blush" },
    { icon: InstagramIcon, label: "Instagram", value: `@${INSTAGRAM_USER}`, href: INSTAGRAM_URL, tone: "bg-lilac" },
    { icon: MapPin, label: "Dirección", value: ADDRESS, href: MAP_DIRECTIONS_URL, tone: "bg-secondary" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-hero px-5 pb-8 pt-16">
        <Swirl className="absolute right-10 top-12 hidden h-14 w-36 text-accent/50 md:block" />
        <Sparkle className="absolute left-10 top-20 h-6 w-6 text-primary" />
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Hablemos"
            title="Contáctanos"
            script="hoy"
            description="Estamos para resolver tus dudas y apartar tu espacio. ¡Nos encantará atenderte!"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.tone} text-secondary-foreground transition-transform duration-500 group-hover:rotate-6`}>
                  <c.icon className="h-7 w-7" />
                </span>
                <p className="eyebrow mt-6">{c.label}</p>
                <p className="mt-2 font-display text-2xl leading-snug text-foreground">{c.value}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border/60 bg-card p-2 shadow-card">
            <iframe
              title="Mapa de ubicación de GiglowSpa"
              src={MAP_EMBED_URL}
              className="h-[380px] w-full rounded-[1.6rem] sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <Button asChild variant="light" size="pill" className="absolute bottom-6 left-6">
              <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                <Navigation /> Cómo llegar
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 text-center">
            <Heart className="mx-auto h-8 w-8 animate-float text-primary" />
            <p className="mt-4 font-display text-3xl italic text-foreground">Tu momento glow te espera</p>
            <BookButton size="xl" className="mt-7" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
