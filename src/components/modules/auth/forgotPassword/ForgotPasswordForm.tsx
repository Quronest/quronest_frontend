"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../FormCard";

import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/schemas/authSchemas/ForgotPasswordSchema";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    setSent(true);
  };

  if (sent) {
    return (
      <FormCard>
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Check your email</h2>
          <p className="text-sm text-neutral">
            We sent a password reset link to your email.
          </p>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold text-center">Forgot Password</h2>

      <Input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
    </FormCard>
  );
}
