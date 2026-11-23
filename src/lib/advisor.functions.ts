import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

import { adviseClient } from "@/lib/ai/advisor.server";

export const ADVISOR_MAX_LENGTH = 600;

const inputSchema = z.object({
  question: z.string().trim().min(5, "Cuéntanos un poquito más").max(ADVISOR_MAX_LENGTH),
});

/** Public: any visitor can ask Gi for a treatment recommendation. */
export const askAdvisor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => adviseClient(data.question, getRequest()));
