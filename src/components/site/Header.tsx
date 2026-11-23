import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { BookButton } from "./BookButton";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-40 border-b border-border/60">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label="GiglowSpa, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="relative rounded-full px-4 py-2 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-secondary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <BookButton size="sm" className="h-10 px-5" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Abrir menú">
              <Menu className="!size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[82%] border-l-0 bg-background">
            <SheetTitle className="sr-only">Menú</SheetTitle>
            <div className="mt-6">
              <Logo />
            </div>
            <nav className="mt-10 flex flex-col gap-2" aria-label="Móvil">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 font-display text-2xl text-foreground transition-colors hover:bg-muted data-[status=active]:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <BookButton className="mt-8 w-full" size="xl" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
