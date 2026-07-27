import ResetPasswordForm from "@/components/modules/auth/resetPassword/ResetPasswordForm";
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";
import { Suspense } from "react";

export default function Page() {
  return (
    <AuthFormContainer>
      <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthFormContainer>
  );
}
