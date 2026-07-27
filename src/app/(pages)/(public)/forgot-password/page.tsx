import ForgotPasswordForm from "@/components/modules/auth/forgotPassword/ForgotPasswordForm";
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer>
      <ForgotPasswordForm />
    </AuthFormContainer>
  );
}
