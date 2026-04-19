import ProfileDetailsForm from "@/components/forms/ProfileDetailsForm";
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";

export default function Page() {
  return (
    <AuthFormContainer>
      <ProfileDetailsForm />
    </AuthFormContainer>
  );
}
