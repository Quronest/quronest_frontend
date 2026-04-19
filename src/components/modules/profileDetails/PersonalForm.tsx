"use client";

import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../auth/FormCard";

type Props = {
  onBack: () => void;
};

export default function PersonalForm({ onBack }: Props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Personal:", data);
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold text-center">Personal Details</h2>

      <Input
        placeholder="Interested Domains"
        {...register("interested_domains")}
      />
      <Input placeholder="Skills" {...register("skills")} />
      <Input placeholder="Primary Goal" {...register("primary_goal")} />
      <Input placeholder="Experience" {...register("experience")} />
      <Input placeholder="Description" {...register("personal_description")} />

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>

        <Button type="submit" className="w-1/2">
          Submit
        </Button>
      </div>
    </FormCard>
  );
}
