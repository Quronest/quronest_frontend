"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FromCard from "./FromCard";
import TextLink from "@/components/ui/TextLink";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FromCard>
      <h1 className="text-2xl font-semibold text-center">Log In</h1>

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

      {/* Login button */}
      <Button type="submit" className="w-full justify-center" variant="primary">
        Log In
      </Button>

      {/* line */}
      <Separator text="OR" />

      {/* google and github login buttons */}
      <div className="flex gap-3">
        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="text-md font-semibold">Google</span>
        </Button>

        {/* GitHub */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <GithubIcon className="w-5 h-5 text-white" />
          <span className="text-md font-semibold">GitHub</span>
        </Button>
      </div>
      <div className="text-center mt-4 text-gray-600 flex items-center justify-center gap-2">
        <p>Don't have an account?</p>
        <TextLink href="/signup">Sign Up</TextLink>
      </div>
    </FromCard>
  );
}

export default LoginForm;
