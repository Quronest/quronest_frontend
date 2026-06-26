import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(5, "Password must be at least 5 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
