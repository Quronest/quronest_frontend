import { z } from "zod";

export const editProfileSchema = z.object({
  avatar: z.union([z.string(), z.instanceof(File)]).optional(),

  fullName: z.string().trim().min(1, "Full name is required"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long"),

  bio: z.string().max(200, "Bio cannot exceed 200 characters"),

  location: z.string().trim(),

  socials: z.object({
    github: z.url("Please enter a valid GitHub URL").or(z.literal("")),

    linkedin: z.url("Please enter a valid LinkedIn URL").or(z.literal("")),

    website: z.url("Please enter a valid website URL").or(z.literal("")),
  }),

  skills: z.array(z.string()),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
