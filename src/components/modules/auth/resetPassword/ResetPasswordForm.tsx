"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../FormCard";

type FormData = {
  password: string;
  confirm: string;
};

export default function ResetPasswordForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const params = useSearchParams();

  const token = params.get("token"); 

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirm) {
      alert("Passwords do not match");
      return;
    }

   
    console.log({ token, ...data });
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <Input
        {...register("password")}
        type="password"
        placeholder="New Password"
      />

      <Input
        {...register("confirm")}
        type="password"
        placeholder="Confirm Password"
      />

      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </FormCard>
  );
}
