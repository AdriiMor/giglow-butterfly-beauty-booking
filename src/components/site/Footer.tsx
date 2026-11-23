import { Link } from "@tanstack/react-router";

import { INSTAGRAM_URL, INSTAGRAM_USER, WHATSAPP_DISPLAY, whatsappLink, ADDRESS } from "@/lib/site";

import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-gradient-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary-foreground">
            Realzamos tu belleza natural con tratamientos estéticos modernos y personalizados.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navega</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-primary">Quiénes Somos</Link></li>
            <li><Link to="/servicios" className="hover:text-primary">Servicios</Link></li>
            <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <WhatsAppIcon className="h-4 w-4" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <InstagramIcon className="h-4 w-4" /> @{INSTAGRAM_USER}
              </a>
            </li>
            <li className="text-secondary-foreground">{ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs tracking-wide text-secondary-foreground">
        © {new Date().getFullYear()} GiglowSpa · Hecho con amor 🦋
      </div>
    </footer>
  );
}
