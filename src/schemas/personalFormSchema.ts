import { z } from "zod";

export const personalFormSchema = z.object({
  interestedDomains: z
    .string()
    .trim()
    .min(1, "Interested domains are required"),

  skills: z.string().trim().min(1, "Skills are required"),

  primaryGoal: z.string().trim().min(1, "Primary goal is required"),

  experience: z.string().trim().min(1, "Experience is required"),

  personalDescription: z
    .string()
    .max(300, "Personal description cannot exceed 300 characters"),
});

export type PersonalFormSchemaType = z.infer<typeof personalFormSchema>;
