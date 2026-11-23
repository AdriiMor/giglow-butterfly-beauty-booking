import { createFileRoute } from "@tanstack/react-router";

import { BookButton } from "@/components/site/BookButton";
import { Sparkle, Swirl } from "@/components/site/Doodles";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCarousel } from "@/components/site/ServiceCarousel";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios · GiglowSpa" },
      {
        name: "description",
        content:
          "Mesoterapia, Dermapen, Faciales, Peptonas, Micropuntura Brasileña, Conoterapia, Copas Colombianas y Gimnasia Pasiva en GiglowSpa.",
      },
      { property: "og:title", content: "Servicios · GiglowSpa" },
      { property: "og:description", content: "Conoce nuestros 8 tratamientos estéticos y agenda tu cita por WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero px-5 pb-6 pt-16">
        <Swirl className="absolute left-6 top-14 hidden h-14 w-36 text-accent/50 md:block" />
        <Sparkle className="absolute right-12 top-20 h-6 w-6 text-primary" />
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Tratamientos"
            title="Nuestros"
            script="servicios"
            description="Desliza para conocer cada tratamiento y toca “Saber más” para descubrir de qué se trata y todos sus beneficios."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <Reveal>
          <ServiceCarousel />
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 pt-10 text-center">
        <Reveal>
          <p className="font-display text-3xl italic text-foreground">¿No sabes cuál elegir?</p>
          <p className="mt-3 text-muted-foreground">Escríbenos y te ayudamos a encontrar el tratamiento ideal para ti.</p>
          <BookButton size="xl" className="mt-7" />
        </Reveal>
      </section>
    </>
  );
}
