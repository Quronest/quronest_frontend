import { z } from "zod";

export const signUpSchema = z
  .object({
    fullname: z.string().trim().min(1, "Full name is required"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long"),

    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
