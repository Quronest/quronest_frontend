import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";
import SignupForm from "@/components/modules/auth/SignupForm";

function page() {
  return (
    <AuthFormContainer>
      <SignupForm />
    </AuthFormContainer>
  );
}

export default page;
