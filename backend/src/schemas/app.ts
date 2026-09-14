import { z } from "zod";

export const createAppSchema = z.object({
  name: z.string().trim().min(1),
  url: z.url(),
  icon: z.url().optional().or(z.literal("")),
});

export const updateAppSchema = createAppSchema.partial();

export type CreateAppInput = z.infer<
  typeof createAppSchema
>;

export type UpdateAppInput = z.infer<
  typeof updateAppSchema
>;