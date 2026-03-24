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
  );
}

export default page;
