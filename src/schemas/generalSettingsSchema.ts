import { z } from "zod";

export const generalSettingsSchema = z.object({
  instituteName: z.string().trim().min(1, "Institute name is required"),

  grade: z.string().trim().min(1, "Grade is required"),

  course: z.string().trim().min(1, "Course is required"),

  academicDescription: z
    .string()
    .max(300, "Academic description cannot exceed 300 characters"),

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

export type GeneralSettingsSchemaType = z.infer<typeof generalSettingsSchema>;
