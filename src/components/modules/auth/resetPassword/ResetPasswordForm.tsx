"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../FormCard";

import {
  resetPasswordSchema,
  ResetPasswordFormDataSchemaType,
} from "@/schemas/ResetPasswordSchema";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormDataSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormDataSchemaType) => {
    console.log({
      token,
      password: data.password,
    });
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <Input
        {...register("password")}
        type="password"
        placeholder="New Password"
        error={errors.password?.message}
      />

      <Input
        {...register("confirm")}
        type="password"
        placeholder="Confirm Password"
        error={errors.confirm?.message}
      />

      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </FormCard>
  );
}
