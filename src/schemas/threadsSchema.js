import { z } from "zod";

export const threadSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const threadsSchema = z.array(threadSchema);