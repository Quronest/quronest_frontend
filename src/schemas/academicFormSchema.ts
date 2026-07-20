import { z } from "zod";

export const academicFormSchema = z.object({
  instituteName: z.string().trim().min(1, "Institute name is required"),

  grade: z.string().trim().min(1, "Grade is required"),

  course: z.string().trim().min(1, "Course is required"),

  academicDescription: z
    .string()
    .max(300, "Academic description cannot exceed 300 characters"),
});

export type AcademicFormSchemaType = z.infer<typeof academicFormSchema>;
