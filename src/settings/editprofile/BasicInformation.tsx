"use client";

import { useFormContext } from "react-hook-form";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { TextArea } from "@/components/ui/TextArea";

import type { EditProfileForm } from "@/types/EditProfiletypes";

export default function BasicInformation() {
  const { register, watch } = useFormContext<EditProfileForm>();

  const bio = watch("bio") ?? "";

  const isEmailVerified = false;

  const handleVerifyEmail = () => {
    console.log("Verify Email");
  };

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

            <Input placeholder="John Doe" {...register("fullName")} />
          </div>

          <div className="space-y-2">
            <Label variant="secondary">Username</Label>

            <Input placeholder="john_doe" {...register("username")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label variant="secondary">Email Address</Label>

          <div className="flex items-start gap-3">
            <Input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />

            {isEmailVerified ? (
              <Button
                type="button"
                size="md"
                disabled
                className="h-12 rounded-xl bg-emerald-500/15 px-5 text-emerald-400"
              >
                Verified
              </Button>
            ) : (
              <Button
                type="button"
                size="md"
                className="h-12 whitespace-nowrap rounded-xl"
                onClick={handleVerifyEmail}
              >
                Verify
              </Button>
            )}
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
            className="border border-border bg-transparent shadow-none focus:ring-0"
            {...register("bio")}
          />
        </div>

        <div className="max-w-md space-y-2">
          <Label variant="secondary">Location</Label>

          <Input placeholder="City, Country" {...register("location")} />
        </div>
      </div>
    </Card>
  );
}
