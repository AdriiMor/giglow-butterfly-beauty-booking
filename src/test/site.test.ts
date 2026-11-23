import { describe, expect, it } from "vitest";

import { services } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

describe("Agendar cita", () => {
  it("opens the GiglowSpa WhatsApp +52 55 4027 4925", () => {
    expect(whatsappLink()).toMatch(/^https:\/\/wa\.me\/525540274925\?text=/);
  });

  it("mentions the chosen treatment in the WhatsApp message", () => {
    const url = new URL(whatsappLink("Dermapen"));
    expect(url.searchParams.get("text")).toContain("Dermapen");
  });
});

describe("Servicios", () => {
  it("lists the eight treatments GiglowSpa offers", () => {
    expect(services.map((s) => s.name)).toEqual([
      "Mesoterapia",
      "Dermapen",
      "Faciales",
      "Peptonas",
      "Micropuntura Brasileña",
      "Conoterapia",
      "Copas Colombianas",
      "Gimnasia Pasiva",
    ]);
  });
});
