import { z } from "zod";

import { academicFormSchema } from "./academicFormSchema";
import { personalFormSchema } from "./personalFormSchema";

export const generalSettingsSchema =
  academicFormSchema.merge(personalFormSchema);

export type GeneralSettingsSchemaType = z.infer<typeof generalSettingsSchema>;
