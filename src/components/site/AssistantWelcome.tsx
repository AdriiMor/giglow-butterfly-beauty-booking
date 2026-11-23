import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import assistant from "@/assets/memoji-assistant.webp";
import { whatsappLink } from "@/lib/site";

import { Heart, Sparkle } from "./Doodles";

const MESSAGES = [
  "¡Hola, hermosa! Bienvenida a GiglowSpa 🦋",
  "Soy Gi, tu asistente de belleza. Estoy aquí para ayudarte a elegir el tratamiento ideal para ti ✨",
  "¿Qué te gustaría hacer hoy?",
];

export function AssistantWelcome() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (shown >= MESSAGES.length) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t = setTimeout(() => {
      setShown((n) => n + 1);
    }, shown === 0 ? 900 : 1400);
    return () => clearTimeout(t);
  }, [shown]);

  const done = shown >= MESSAGES.length;

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Blob + memoji */}
      <div className="relative mx-auto aspect-square w-64 sm:w-80">
        <div className="absolute inset-4 animate-blob bg-gradient-soft shadow-card" />
        <img
          src={assistant}
          alt="Gi, la asistente memoji de GiglowSpa saludando"
          width={720}
          height={720}
          className="relative z-10 h-full w-full animate-float object-contain drop-shadow-xl"
        />
        <Sparkle className="absolute -left-2 top-6 z-20 h-7 w-7 text-primary" />
        <Sparkle className="absolute right-0 top-2 z-20 h-5 w-5 text-accent" style={{ animationDelay: "0.8s" }} />
        <Heart className="absolute -right-3 bottom-16 z-20 h-8 w-8 animate-float-slow text-primary" />
      </div>

      {/* Chat */}
      <div className="relative z-20 -mt-6 space-y-2 rounded-3xl border border-border/70 bg-card/90 p-4 shadow-card backdrop-blur" aria-live="polite">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <img src={assistant} alt="" className="h-8 w-8 rounded-full bg-blush object-cover object-top" />
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">Gi · Asistente GiglowSpa</p>
            <p className="text-xs text-primary">● en línea</p>
          </div>
        </div>
        {MESSAGES.slice(0, shown).map((m) => (
          <p key={m} className="w-fit max-w-[90%] animate-bubble-in rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-secondary-foreground">
            {m}
          </p>
        ))}
        {typing && !done && (
          <div className="flex w-fit gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3" aria-label="Gi está escribiendo">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        )}
        {done && (
          <div className="flex animate-bubble-in flex-wrap justify-end gap-2 pt-1">
            <Link to="/servicios" className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-blush/50">
              Ver servicios 💆‍♀️
            </Link>
            <Link to="/quienes-somos" className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-blush/50">
              Conocerlas 🌸
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-primary px-3 py-1.5 text-xs text-primary-foreground shadow-soft"
            >
              Agendar cita 📅
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
