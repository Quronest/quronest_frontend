import { z } from "zod";

export const academicFormSchema = z.object({
  institute_name: z.string().trim().min(1, "Institute name is required"),

  grade: z.string().trim().min(1, "Grade is required"),

  course: z.string().trim().min(1, "Course is required"),

  academic_description: z
    .string()
    .max(300, "Academic description cannot exceed 300 characters"),
});

export type AcademicFormSchemaType = z.infer<typeof academicFormSchema>;
