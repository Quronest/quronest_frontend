"use client";

import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../auth/FormCard";

type Props = {
  onNext: () => void;
};

export default function AcademicForm({ onNext }: Props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    onNext();
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold text-center">Academic Details</h2>

      <Input placeholder="Institute Name" {...register("institute_name")} />
      <Input placeholder="Grade" {...register("grade")} />
      <Input placeholder="Course" {...register("course")} />
      <Input placeholder="Description" {...register("academic_description")} />

      <div className="flex justify-end w-full">
        <Button type="submit" variant="primary" className="flex-1">
          Continue
        </Button>
      </div>
    </FormCard>
  );
}
