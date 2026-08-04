import { Suspense } from "react";
import ProfileDetailsForm from "@/components/forms/ProfileDetailsForm";
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer>
      <Suspense fallback={
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </div>
      }>
        <ProfileDetailsForm />
      </Suspense>
    </AuthFormContainer>
  );
}
