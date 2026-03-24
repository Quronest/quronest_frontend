<<<<<<< HEAD
import AuthFormContainer from "@/components/modules/auth/AuthFormContainer";
import SignupForm from "@/components/modules/auth/SignupForm";

function page() {
  return (
    <AuthFormContainer>
      <SignupForm />
    </AuthFormContainer>
=======
import SignupForm from "@/components/modules/auth/SignupForm";
import Link from "next/dist/client/link";

import React from "react";

function page() {
  return (
    <>
      {/* Signup Form */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <SignupForm />
        
      </div>

      
    </>
>>>>>>> bc212d1 (Login and Sign Up page created)
  );
}

export default page;
