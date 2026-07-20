"use client";

import { useFormContext, useFormState } from "react-hook-form";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { TextArea } from "@/components/ui/TextArea";

import type { EditProfileSchemaType } from "@/schemas/editProfileSchema";

export default function BasicInformation() {
  const { register, watch, control } = useFormContext<EditProfileSchemaType>();

  const { errors } = useFormState({
    control,
  });

  const bio = watch("bio") ?? "";

  return (
    <Card className="rounded-3xl bg-card p-8 shadow-xl">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Basic Information</h2>

          <p className="mt-2 text-sm text-neutral">
            Update your personal information and keep your profile up to date.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label variant="secondary">Full Name</Label>

            <Input
              placeholder="John Doe"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </div>

          <div className="space-y-2">
            <Label variant="secondary">Username</Label>

            <Input
              placeholder="john_doe"
              error={errors.username?.message}
              {...register("username")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label variant="secondary">Bio</Label>

            <span className="text-xs text-neutral">{bio.length}/200</span>
          </div>

          <TextArea
            placeholder="Tell us a little about yourself..."
            minHeight={140}
            maxHeight={240}
            maxLength={200}
            {...register("bio")}
          />
        </div>

        <div className="max-w-md space-y-2">
          <Label variant="secondary">Location</Label>

          <Input
            placeholder="City, Country"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>
      </div>
    </Card>
  );
}
