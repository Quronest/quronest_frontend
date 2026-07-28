"use client";

import { useState } from "react";

import AcademicForm from "@/components/modules/profileDetails/AcademicForm";
import PersonalForm from "@/components/modules/profileDetails/PersonalForm";
import { useRouter, useSearchParams } from "next/navigation";
import { StartJourney } from "../modules/profileDetails/StartJourney";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = Number(searchParams.get("tab") ?? "0");

  const setStep = (tab: number) => {
    router.replace(`?tab=${tab}`);
  };

  return (
    <>
      {step === 0 && <PersonalForm onBack={() => setStep(1)} />}
      {step === 1 && <AcademicForm onNext={() => setStep(2)} />}
      {step === 2 && <StartJourney />}
    </>
  );
}
