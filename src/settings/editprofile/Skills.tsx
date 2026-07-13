"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { clsx } from "clsx";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import type { EditProfileForm } from "@/types/EditProfiletypes";

export default function Skills() {
  const { control, setValue } = useFormContext<EditProfileForm>();

  const skills = useWatch({
    control,
    name: "skills",
    defaultValue: [],
  });

  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    const exists = skills.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      setSkill("");
      return;
    }

    setValue("skills", [...skills, value]);

    setSkill("");
  };

  const removeSkill = (index: number) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  };

  return (
    <Card className="rounded-3xl bg-card p-8 shadow-xl">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Skills</h2>

          <p className="mt-2 text-sm text-neutral">
            Add the skills that best represent your expertise.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <Input
            value={skill}
            placeholder="e.g. React, TypeScript, Node.js"
            className="border bg-transparent shadow-none"
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />

          <Button
            type="button"
            variant="primary"
            className="h-12 rounded-xl px-6"
            onClick={addSkill}
          >
            <Plus size={18} className="mr-2" />
            Add
          </Button>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "flex h-8 w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 opacity-60",
                  "text-sm text-neutral",
                )}
              >
                <span>{item}</span>

                <button type="button" onClick={() => removeSkill(index)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center">
            <p className="text-sm text-neutral">
              No skills added yet. Add your first skill above.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
