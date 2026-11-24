import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import assistant from "@/assets/memoji-assistant.webp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ADVISOR_MAX_LENGTH, askAdvisor } from "@/lib/advisor.functions";
import { services, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

import { BookButton } from "./BookButton";
import { Heart, Sparkle } from "./Doodles";
import { ServiceDialog } from "./ServiceDialog";

const EXAMPLES = [
  "Quiero reducir grasa del abdomen sin cirugía",
  "Tengo estrías blancas en las piernas, ¿qué me ayuda?",
  "Me gustaría levantar y dar volumen a mis glúteos",
  "Tengo manchas y marcas de acné en la cara",
];

type Advice = {
  question: string;
  reply: string;
  tip: string | null;
  items: { service: Service; reason: string }[];
};

export function ServiceAdvisor() {
  const ask = useServerFn(askAdvisor);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [active, setActive] = useState<Service | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const trimmed = question.trim();
  const canSend = trimmed.length >= 5 && !loading;

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!canSend) return;
    setLoading(true);
    setError(null);
    setAdvice(null);
    try {
      const res = await ask({ data: { question: trimmed } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const items = res.recommendations.flatMap((r) => {
        const service = services.find((s) => s.slug === r.slug);
        return service ? [{ service, reason: r.reason }] : [];
      });
      setAdvice({ question: trimmed, reply: res.reply, tip: res.tip, items });
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    } catch {
      setError("No pudimos conectar con Gi. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setAdvice(null);
    setError(null);
    setQuestion("");
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-card backdrop-blur sm:p-8">
      <Sparkle className="absolute right-8 top-6 h-5 w-5 text-primary" />
      <Heart className="absolute bottom-6 left-6 hidden h-7 w-7 animate-float-slow text-accent/60 sm:block" />

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          <div className="absolute inset-0 animate-blob bg-gradient-soft" />
          <img src={assistant} alt="" className="relative h-full w-full animate-float object-contain" />
        </div>
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Asesora con IA
          </p>
          <h2 className="mt-1 font-display text-2xl text-foreground sm:text-3xl">Cuéntale a Gi qué buscas</h2>
        </div>
      </div>

      {/* Assistant greeting */}
      <p className="mt-5 w-fit max-w-[95%] animate-bubble-in rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground">
        ¡Hola, hermosa! 🦋 Escríbeme tus objetivos o dudas (por ejemplo, qué zona quieres trabajar o qué te gustaría mejorar) y te
        recomiendo los tratamientos de GiglowSpa que mejor van contigo.
      </p>

      {/* Form */}
      {!advice && (
        <form onSubmit={submit} className="mt-5 space-y-3">
          <label htmlFor="advisor-question" className="sr-only">
            Describe tus objetivos o dudas
          </label>
          <Textarea
            id="advisor-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, ADVISOR_MAX_LENGTH))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
            placeholder="Ej. Quiero reafirmar mis piernas y reducir la celulitis antes de vacaciones…"
            rows={3}
            disabled={loading}
            className="min-h-[96px] resize-none rounded-2xl border-border/70 bg-background/70 text-base"
          />
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                disabled={loading}
                onClick={() => setQuestion(ex)}
                className="rounded-full border border-border/70 bg-muted px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-lilac disabled:opacity-50"
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-xs text-muted-foreground">
              {question.length}/{ADVISOR_MAX_LENGTH}
            </span>
            <Button type="submit" variant="hero" size="pill" disabled={!canSend}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Gi está pensando…" : "Pedir recomendación"}
            </Button>
          </div>
        </form>
      )}

      {loading && (
        <div className="mt-4 flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3" aria-live="polite">
          <span className="sr-only">Gi está escribiendo</span>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Result */}
      {advice && (
        <div ref={resultRef} className="mt-5 space-y-4" aria-live="polite">
          <p className="ml-auto w-fit max-w-[90%] animate-bubble-in rounded-2xl rounded-tr-sm bg-gradient-primary px-4 py-2.5 text-sm text-primary-foreground">
            {advice.question}
          </p>
          <p className="w-fit max-w-[95%] animate-bubble-in rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground">
            {advice.reply}
          </p>

          {advice.items.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {advice.items.map(({ service, reason }, i) => (
                <article
                  key={service.slug}
                  className="flex animate-bubble-in flex-col rounded-3xl border border-border/70 bg-background/80 p-4 shadow-soft"
                  style={{ animationDelay: `${(i + 1) * 120}ms` }}
                >
                  <div className={cn("flex h-28 items-end justify-center rounded-2xl", service.tone === "blush" ? "bg-blush" : "bg-lilac")}>
                    <img src={service.image} alt={`Ilustración de ${service.name}`} className="h-28 w-28 object-contain" loading="lazy" />
                  </div>
                  <h3 className="mt-3 font-display text-xl text-foreground">{service.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{reason}</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="outlineSoft" size="sm" className="rounded-full" onClick={() => setActive(service)}>
                      Saber más <ArrowRight className="h-4 w-4" />
                    </Button>
                    <BookButton service={service.name} size="sm" className="rounded-full" />
                  </div>
                </article>
              ))}
            </div>
          )}

          {advice.tip && (
            <p className="rounded-2xl border border-dashed border-primary/40 bg-blush/40 px-4 py-3 text-sm text-foreground">
              <span className="font-medium">Tip de Gi: </span>
              {advice.tip}
            </p>
          )}

          <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Recomendación orientativa. En tu valoración confirmamos el tratamiento ideal para ti.
            </p>
            <Button variant="soft" size="sm" className="rounded-full" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> Hacer otra pregunta
            </Button>
          </div>
        </div>
      )}

      <ServiceDialog service={active} onOpenChange={(open) => !open && setActive(null)} />
    </div>
  );
}
