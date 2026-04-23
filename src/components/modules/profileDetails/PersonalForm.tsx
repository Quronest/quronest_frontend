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
      <div className="flex gap-3 w-full">
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
