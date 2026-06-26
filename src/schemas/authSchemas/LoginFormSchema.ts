import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
