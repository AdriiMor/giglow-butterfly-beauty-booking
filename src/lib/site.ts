export const SITE_NAME = "GiglowSpa";

export const WHATSAPP_NUMBER = "525540274925";
export const WHATSAPP_DISPLAY = "+52 55 4027 4925";

export const INSTAGRAM_USER = "giglowspa";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_USER}`;

export const ADDRESS = "Presas, Tezontepec de Aldama, Hidalgo, México";
const addressQuery = encodeURIComponent(ADDRESS);
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

/** Builds the WhatsApp link every "Agendar cita" button uses. */
export function whatsappLink(service?: string): string {
  const text = service
    ? `Hola GiglowSpa ✨ Me gustaría agendar una cita para ${service}.`
    : "Hola GiglowSpa ✨ Me gustaría agendar una cita.";
  // Direct api.whatsapp.com link: wa.me redirects, which breaks the emoji and can fail inside embedded previews.
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}
