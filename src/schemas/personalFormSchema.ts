import { z } from "zod";

export const personalFormSchema = z.object({
  interested_domains: z
    .string()
    .trim()
    .min(1, "Interested domains are required"),

  skills: z.string().trim().min(1, "Skills are required"),

  primary_goal: z.string().trim().min(1, "Primary goal is required"),

  experience: z.string().trim().min(1, "Experience is required"),

  personal_description: z
    .string()
    .max(300, "Personal description cannot exceed 300 characters"),
});

export type PersonalFormSchemaType = z.infer<typeof personalFormSchema>;
