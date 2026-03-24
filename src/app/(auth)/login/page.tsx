import LoginForm from "@/components/modules/auth/LoginForm";
<<<<<<< HEAD
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";

export default function LoginPage() {
  return (
    <AuthFormContainer>
      <LoginForm />
    </AuthFormContainer>
=======
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      {/* Login Form */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        {" "}
        <LoginForm />
    
      </div>
    </>
>>>>>>> bc212d1 (Login and Sign Up page created)
  );
}
