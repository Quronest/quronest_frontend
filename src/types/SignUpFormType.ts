import { z } from "zod";

export const signUpSchema = z
  .object({
    fullname: z.string().trim().min(1, "Full name is required"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine(
        (val) => {
          const hasUpperCase = /[A-Z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          const hasSpecialChar = /[^A-Za-z0-9]/.test(val);

          return hasUpperCase && hasNumber && hasSpecialChar;
        },
        {
          message:
            "Password must include at least one uppercase letter, one number, and one special character",
        },
      ),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
