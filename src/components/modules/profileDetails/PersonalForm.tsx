"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../auth/FormCard";
import { TextArea } from "@/components/ui/TextArea";

import {
  personalFormSchema,
  type PersonalFormSchemaType,
} from "@/schemas/personalFormSchema";
import { useSetPersonalDataMutation } from "@/store/features/user/userApi";
import clsx from "clsx";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onNext: () => void;
};

export default function PersonalForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalFormSchemaType>({
    resolver: zodResolver(personalFormSchema),
    mode: "onBlur",
    defaultValues: {
      interested_domains: "",
      skills: "",
      primary_goal: "",
      experience: "",
      personal_description: "",
    },
  });
  const router = useRouter();
  const [setPersonalData, result] = useSetPersonalDataMutation();

  const personalDescription = watch("personal_description") ?? "";

  const onSubmit = async (data: PersonalFormSchemaType) => {
    console.log("Personal:", data);
    await asyncHandler(() => setPersonalData(data).unwrap());
    onNext();
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-lg font-semibold">Personal Details</h2>

      <Input
        placeholder="Interested Domains"
        error={errors.interested_domains?.message}
        {...register("interested_domains")}
      />

      <Input
        placeholder="Skills"
        error={errors.skills?.message}
        {...register("skills")}
      />

      <Input
        placeholder="Primary Goal"
        error={errors.primary_goal?.message}
        {...register("primary_goal")}
      />

      <Input
        placeholder="Experience"
        error={errors.experience?.message}
        {...register("experience")}
      />

      <TextArea
        placeholder="Tell us about yourself..."
        maxLength={300}
        minHeight={120}
        maxHeight={220}
        {...register("personal_description")}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-red-500">
          {errors.personal_description?.message}
        </span>

        <span className="text-xs text-neutral">
          {personalDescription.length}/300
        </span>
      </div>

      <Button type="submit" variant="primary" disabled={result.isLoading}>
        Continue
      </Button>
    </FormCard>
  );
}
