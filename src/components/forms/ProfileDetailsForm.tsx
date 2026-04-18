"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import FormCard from "../modules/auth/FormCard";
import AcademicForm from "../modules/profileDetails/AcademicForm";
import PersonalForm from "../modules/profileDetails/PersonalForm";

type FormData = {
  institute_name: string;
  grade: string;
  course: string;
  academic_description: string;

  interested_domains: string;
  skills: string;
  primary_goal: string;
  experience: string;
  personal_description: string;
};

export default function ProfileDetailsForm() {
  const [step, setStep] = useState(0);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("DATA:", data);
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && <AcademicForm register={register} />}
      {step === 1 && <PersonalForm register={register} />}

      <div className="flex w-full gap-3">
        {step === 0 && (
          <div className="flex w-full justify-end">
            <Button type="button" onClick={() => setStep(1)}>
              Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <>
            <Button variant = "outline" className="w-1/2" onClick={() => setStep(0)}>
              Back
            </Button>

            <Button type="submit" variant="primary" className="w-1/2">
              Submit
            </Button>
          </>
        )}
      </div>
    </FormCard>
  );
}
