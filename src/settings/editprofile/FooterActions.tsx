"use client";

import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

import Button from "@/components/ui/Button";

import type { EditProfileForm } from "@/types/EditProfiletypes";

export default function FooterActions() {
  const {
    formState: { isSubmitting },
  } = useFormContext<EditProfileForm>();

  return (
    <div className="flex items-center justify-end pt-2">
      <Button
        type="submit"
        variant="primary"
        className="h-12 rounded-xl px-6"
        onClick={() => console.log("Save button clicked")}
      >
        <Save size={18} className="mr-2" />

        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
