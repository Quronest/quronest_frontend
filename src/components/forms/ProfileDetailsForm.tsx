"use client";

import { useState } from "react";

import AcademicForm from "@/components/modules/profileDetails/AcademicForm";
import PersonalForm from "@/components/modules/profileDetails/PersonalForm";

export default function Page() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-xl mx-auto p-6">
      {step === 0 && <AcademicForm onNext={() => setStep(1)} />}
      {step === 1 && <PersonalForm onBack={() => setStep(0)} />}
    </div>
  );
}
