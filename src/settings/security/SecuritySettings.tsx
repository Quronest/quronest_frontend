"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import {
  securitySchema,
  type SecuritySchemaType,
} from "@/schemas/securitySchema";

const SecuritySettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecuritySchemaType>({
    resolver: zodResolver(securitySchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SecuritySchemaType) => {
    console.log("Password Update:", data);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Security Settings
          </h1>

          <p className="mt-2 text-sm text-neutral">
            Update your password to keep your account secure.
          </p>
        </div>

        <Card className="rounded-3xl bg-card p-8 shadow-xl">
          <div className="space-y-8">
            <div className="space-y-2">
              <Label variant="secondary">Current Password</Label>

              <Input
                type="password"
                placeholder="Current Password"
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label variant="secondary">New Password</Label>

                <Input
                  type="password"
                  placeholder="New Password"
                  error={errors.newPassword?.message}
                  {...register("newPassword")}
                />
              </div>

              <div className="space-y-2">
                <Label variant="secondary">Confirm Password</Label>

                <Input
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="rounded-xl px-8"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SecuritySettings;
