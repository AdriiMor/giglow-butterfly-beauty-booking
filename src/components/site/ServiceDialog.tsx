import { Check } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

import { BookButton } from "./BookButton";
import { Sparkle } from "./Doodles";

export function ServiceDialog({ service, onOpenChange }: { service: Service | null; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={service !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl gap-0 overflow-y-auto rounded-3xl border-border/60 bg-card p-0 sm:rounded-3xl">
        {service && (
          <>
            <div className={cn("relative flex items-end justify-center overflow-hidden rounded-t-3xl pt-6", service.tone === "blush" ? "bg-blush" : "bg-lilac")}>
              <Sparkle className="absolute left-8 top-8 h-6 w-6 text-card" />
              <Sparkle className="absolute right-10 top-14 h-4 w-4 text-card" style={{ animationDelay: "1s" }} />
              <img src={service.image} alt={`Ilustración de ${service.name}`} className="h-56 w-56 animate-float object-contain sm:h-64 sm:w-64" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow">{service.tagline}</p>
              <DialogTitle className="mt-2 font-display text-4xl font-medium text-foreground">{service.name}</DialogTitle>
              <DialogDescription className="sr-only">Qué es, de qué se trata y beneficios de {service.name}</DialogDescription>

              <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <div>
                  <h3 className="font-display text-xl text-foreground">¿Qué es?</h3>
                  <p className="mt-1">{service.what}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">¿De qué se trata?</h3>
                  <p className="mt-1">{service.how}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">Beneficios</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 rounded-2xl bg-muted px-3 py-2.5 text-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <BookButton service={service.name} size="xl" className="mt-8 w-full" label={`Agendar cita de ${service.name}`} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
