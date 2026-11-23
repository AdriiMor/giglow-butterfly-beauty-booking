import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

import { WhatsAppIcon } from "./Icons";

type Props = {
  service?: string;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

export function BookButton({ service, label = "Agendar cita", variant = "hero", size = "pill", className }: Props) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={whatsappLink(service)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-5 w-5" />
        {label}
      </a>
    </Button>
  );
}
