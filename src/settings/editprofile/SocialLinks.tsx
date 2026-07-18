"use client";

import { Globe, Github, Linkedin } from "lucide-react";
import { useFormContext, useFormState } from "react-hook-form";

import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import type { EditProfileSchemaType } from "@/schemas/editProfileSchema";

export default function SocialLinks() {
  const { register, control } = useFormContext<EditProfileSchemaType>();

  const { errors } = useFormState({
    control,
  });

  return (
    <Card className="rounded-3xl bg-card p-8 shadow-xl">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Social Links</h2>

          <p className="mt-2 text-sm text-neutral">
            Share your professional profiles and portfolio so others can connect
            with you.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/40">
              <Github size={20} className="text-neutral" />
            </div>

            <Input
              className="bg-transparent shadow-none"
              placeholder="https://github.com/username"
              error={errors.socials?.github?.message}
              {...register("socials.github")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/40">
              <Linkedin size={20} className="text-neutral" />
            </div>

            <Input
              className="bg-transparent shadow-none"
              placeholder="https://linkedin.com/in/username"
              error={errors.socials?.linkedin?.message}
              {...register("socials.linkedin")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/40">
              <Globe size={20} className="text-neutral" />
            </div>

            <Input
              className="bg-transparent shadow-none"
              placeholder="https://yourportfolio.com"
              error={errors.socials?.website?.message}
              {...register("socials.website")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
