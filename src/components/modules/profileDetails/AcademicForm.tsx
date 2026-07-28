"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormCard from "../auth/FormCard";
import { TextArea } from "@/components/ui/TextArea";

import {
  academicFormSchema,
  type AcademicFormSchemaType,
} from "@/schemas/academicFormSchema";

type Props = {
  onNext: () => void;
};

export default function AcademicForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AcademicFormSchemaType>({
    resolver: zodResolver(academicFormSchema),
    mode: "onBlur",
    defaultValues: {
      institute_name: "",
      grade: "",
      course: "",
      academic_description: "",
    },
  });

  const academicDescription = watch("academic_description") ?? "";

  const onSubmit = () => {
    onNext();
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-lg font-semibold">Academic Details</h2>

      <Input
        placeholder="Institute Name"
        error={errors.institute_name?.message}
        {...register("institute_name")}
      />

      <Input
        placeholder="Grade"
        error={errors.grade?.message}
        {...register("grade")}
      />

      <Input
        placeholder="Course"
        error={errors.course?.message}
        {...register("course")}
      />

      <TextArea
        placeholder="Tell us about your academics..."
        maxLength={300}
        minHeight={120}
        maxHeight={220}
        {...register("academic_description")}
      />

      <div className="flex items-center justify-between">
        <span className="text-sm text-red-500">
          {errors.academic_description?.message}
        </span>

        <span className="text-xs text-neutral">
          {academicDescription.length}/300
        </span>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit" variant="primary" className="flex-1">
          Continue
        </Button>
      </div>
    </FormCard>
  );
}
