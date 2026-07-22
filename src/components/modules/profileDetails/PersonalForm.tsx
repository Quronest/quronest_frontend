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

type Props = {
  onBack: () => void;
};

export default function PersonalForm({ onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalFormSchemaType>({
    resolver: zodResolver(personalFormSchema),
    mode: "onBlur",
    defaultValues: {
      interestedDomains: "",
      skills: "",
      primaryGoal: "",
      experience: "",
      personalDescription: "",
    },
  });

  const personalDescription = watch("personalDescription") ?? "";

  const onSubmit = (data: PersonalFormSchemaType) => {
    console.log("Personal:", data);
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-lg font-semibold">Personal Details</h2>

      <Input
        placeholder="Interested Domains"
        error={errors.interestedDomains?.message}
        {...register("interestedDomains")}
      />

      <Input
        placeholder="Skills"
        error={errors.skills?.message}
        {...register("skills")}
      />

      <Input
        placeholder="Primary Goal"
        error={errors.primaryGoal?.message}
        {...register("primaryGoal")}
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
        {...register("personalDescription")}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-red-500">
          {errors.personalDescription?.message}
        </span>

        <span className="text-xs text-neutral">
          {personalDescription.length}/300
        </span>
      </div>

      <div className="flex w-full gap-3">
        <Button className="flex-1" variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button className="flex-1" type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </FormCard>
  );
}
