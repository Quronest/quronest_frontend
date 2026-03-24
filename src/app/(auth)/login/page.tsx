import LoginForm from "@/components/modules/auth/LoginForm";
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
  );
}
