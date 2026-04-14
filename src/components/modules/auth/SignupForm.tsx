"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FormCard from "./FormCard";
import TextLink from "@/components/ui/TextLink";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register: registerUser, isSigningIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { confirmPassword, ...registerData } = form;
    await registerUser({ data: registerData });
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormCard>
      <h1 className="text-2xl font-semibold text-center">Create Account</h1>

      {/* Inputs */}
      <Input
        {...register("fullname")}
        placeholder="Full Name"
        disabled={isSigningIn}
        required
      />

      <Input placeholder="Username" disabled={isSigningIn} required />

      <Input type="email" placeholder="Email" disabled={isSigningIn} required />

      <Input
        type="password"
        placeholder="Password"
        disabled={isSigningIn}
        required
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        disabled={isSigningIn}
        required
      />

      {/* Signup button */}
      <Button
        type="button"
        className="w-full justify-center"
        variant="primary"
        onClick={handleRegister}
      >
        {isSigningIn ? "Signing In..." : "Sign Up"}
      </Button>

      {/* line */}
      <Separator text="OR" />

      {/* google and github sign up buttons */}
      <div className="flex gap-3">
        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <GoogleIcon />
          <span className="text-md font-semibold">Google</span>
        </Button>

        {/* GitHub */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <GithubIcon className="text-white" />
          <span className="text-md font-semibold">GitHub</span>
        </Button>
      </div>

      <div className="text-center mt-4 text-gray-600 flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <TextLink href="/login">Log In</TextLink>
      </div>
    </FormCard>
  );
}

export default SignupForm;
