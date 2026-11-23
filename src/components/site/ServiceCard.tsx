import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, index, onMore }: { service: Service; index: number; onMore: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
      <div className={cn("relative flex aspect-[4/3.4] items-end justify-center overflow-hidden", service.tone === "blush" ? "bg-blush" : "bg-lilac")}>
        <span className="absolute left-5 top-4 font-display text-5xl italic text-card/80">{String(index + 1).padStart(2, "0")}</span>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-card/30" />
        <img
          src={service.image}
          alt={`Ilustración memoji de ${service.name}`}
          loading="lazy"
          width={720}
          height={720}
          className="relative h-[92%] w-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-[0.65rem]">{service.tagline}</p>
        <h3 className="mt-2 text-3xl font-medium text-foreground">{service.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{service.what}</p>
        <Button variant="outlineSoft" size="pill" onClick={onMore} className="mt-5 self-start">
          Saber más <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </article>
  );
}
