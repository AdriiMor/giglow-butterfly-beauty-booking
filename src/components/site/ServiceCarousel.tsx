import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { services, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

import { ServiceCard } from "./ServiceCard";
import { ServiceDialog } from "./ServiceDialog";

export function ServiceCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [active, setActive] = useState<Service | null>(null);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setSnaps(api.scrollSnapList());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-5 py-4">
          {services.map((s, i) => (
            <CarouselItem key={s.slug} className="pl-5 sm:basis-1/2 lg:basis-1/3">
              <ServiceCard service={s} index={i} onMore={() => setActive(s)} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-5">
        <Button variant="soft" size="icon" className="h-11 w-11" onClick={() => api?.scrollPrev()} aria-label="Servicio anterior">
          <ChevronLeft className="!size-5" />
        </Button>
        <div className="flex gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir al servicio ${i + 1}`}
              className={cn("h-2 rounded-full transition-all duration-500", i === selected ? "w-8 bg-gradient-primary" : "w-2 bg-lilac")}
            />
          ))}
        </div>
        <Button variant="soft" size="icon" className="h-11 w-11" onClick={() => api?.scrollNext()} aria-label="Siguiente servicio">
          <ChevronRight className="!size-5" />
        </Button>
      </div>

      <ServiceDialog service={active} onOpenChange={(open) => !open && setActive(null)} />
    </div>
  );
}
