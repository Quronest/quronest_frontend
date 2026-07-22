"use client";

import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

import Button from "@/components/ui/Button";

import type { EditProfileSchemaType } from "@/schemas/editProfileSchema";

export default function FooterActions() {
  useFormContext<EditProfileSchemaType>();

  return (
    <div className="flex items-center justify-end pt-2">
      <Button type="submit" variant="primary" className="h-12 rounded-xl px-6">
        <Save size={18} className="mr-2" />
        Save Changes
      </Button>
    </div>
  );
}
