import ResetPasswordForm from "@/components/modules/auth/resetPassword/ResetPasswordForm";
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer>
      <ResetPasswordForm />
    </AuthFormContainer>
  );
}
