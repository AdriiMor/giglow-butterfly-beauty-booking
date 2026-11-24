import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

import { services } from "@/lib/services";

import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "./run-id.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6.1-sol";

const slugs = services.map((s) => s.slug) as [string, ...string[]];

const adviceSchema = z.object({
  reply: z.string(),
  recommendations: z.array(
    z.object({
      slug: z.enum(slugs),
      reason: z.string(),
    }),
  ),
  tip: z.string().nullable(),
});

export type AdvisorResult =
  | { ok: true; reply: string; recommendations: { slug: string; reason: string }[]; tip: string | null }
  | { ok: false; error: string };

function catalog(): string {
  return services
    .map(
      (s) =>
        `- slug: ${s.slug}\n  Nombre: ${s.name} (${s.tagline})\n  Qué es: ${s.what}\n  Cómo se hace: ${s.how}\n  Beneficios: ${s.benefits.join("; ")}`,
    )
    .join("\n");
}

const INSTRUCTIONS = `Eres "Gi", la asistente virtual de GiglowSpa, un spa de tratamientos estéticos en Presas, Tezontepec de Aldama, Hidalgo, México.
Una clienta te describe sus objetivos o dudas. Responde SIEMPRE en español de México, con un tono cálido, cercano y profesional (puedes llamarla "hermosa" o "bonita" con moderación).

Reglas:
- Solo recomienda tratamientos del catálogo de GiglowSpa que aparece abajo, usando su slug exacto. Recomienda de 1 a 3, ordenados del más al menos relevante.
- "reply": 2 a 4 frases que respondan su duda o explique cómo puede ayudarle GiglowSpa, basándote solo en la información del catálogo.
- "reason": 1 o 2 frases sobre por qué ese tratamiento encaja con lo que ella describió.
- "tip": un consejo breve y útil (por ejemplo combinar tratamientos o qué preguntar en su valoración), o null si no aplica.
- No inventes precios, duración, número de sesiones, horarios ni promociones: si pregunta por eso, dile que se lo confirman por WhatsApp al agendar.
- No hagas diagnósticos médicos ni prometas resultados garantizados (pero no lo menciones literalmente en tu respuesta). Si menciona embarazo, lactancia, enfermedades, medicamentos, alergias, heridas o dolor fuerte, recomiéndale comentarlo en su valoración antes de cualquier tratamiento y, si es algo médico, consultar a su médico.
- Si la pregunta no tiene relación con estética o bienestar, responde amablemente que solo puedes ayudar con los servicios de GiglowSpa y sugiere los tratamientos más populares.

Catálogo de servicios de GiglowSpa:
${catalog()}`;

function friendlyError(status: number | undefined): string {
  if (status === 429) return "Gi está atendiendo a muchas clientas en este momento. Intenta de nuevo en un minuto, por favor.";
  if (status === 402 || status === 403)
    return "El asistente no está disponible por ahora. Mientras tanto, escríbenos por WhatsApp y con gusto te ayudamos.";
  return "No pudimos obtener una recomendación en este momento. Intenta de nuevo o escríbenos por WhatsApp.";
}

export async function adviseClient(question: string, request: Request): Promise<AdvisorResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("[advisor] LOVABLE_API_KEY is not configured");
    return { ok: false, error: friendlyError(undefined) };
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      instructions: INSTRUCTIONS,
      messages: [{ role: "user", content: question }],
      output: Output.object({ schema: adviceSchema }),
      maxRetries: 0,
      abortSignal: request.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const output = await result.output;
    const seen = new Set<string>();
    const recommendations = output.recommendations
      .filter((r) => {
        if (seen.has(r.slug)) return false;
        seen.add(r.slug);
        return true;
      })
      .slice(0, 3);

    if (!output.reply.trim() && recommendations.length === 0) {
      return { ok: false, error: friendlyError(undefined) };
    }
    return { ok: true, reply: output.reply.trim(), recommendations, tip: output.tip?.trim() || null };
  } catch (error) {
    if (APICallError.isInstance(error)) {
      console.error("[advisor] gateway error", error.statusCode, error.message);
      return { ok: false, error: friendlyError(error.statusCode) };
    }
    if (NoObjectGeneratedError.isInstance(error)) {
      console.error("[advisor] invalid structured output", error.text);
      return { ok: false, error: friendlyError(undefined) };
    }
    console.error("[advisor] unexpected error", error);
    return { ok: false, error: friendlyError(undefined) };
  }
}
