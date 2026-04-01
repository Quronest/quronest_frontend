"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FromCard from "./FromCard";
import TextLink from "@/components/ui/TextLink";

function SignupForm() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FromCard>
      <h1 className="text-2xl font-semibold text-center">Create Account</h1>

      {/* Inputs */}
      <Input
        placeholder="Full Name"
        value={form.fullname}
        onChange={(val) => handleChange("fullname", val)}
      />

      <Input
        placeholder="Username"
        value={form.username}
        onChange={(val) => handleChange("username", val)}
      />

      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(val) => handleChange("email", val)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(val) => handleChange("password", val)}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(val) => handleChange("confirmPassword", val)}
      />

      {/* Signup button */}
      <Button type="submit" className="w-full justify-center" variant="primary">
        Sign Up
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
    </FromCard>
  );
}

export default SignupForm;
