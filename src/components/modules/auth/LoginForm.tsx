"use client";

import { MouseEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FromCard from "./FromCard";
import TextLink from "@/components/ui/TextLink";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuth();
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    await login({ data: form });
    router.push("/home");
  };

  return (
    <FromCard>
      <h1 className="text-2xl font-semibold text-center">Log In</h1>

      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={isLoggingIn}
      />

      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        disabled={isLoggingIn}
      />

      {/* Login button */}
      <Button
        className="w-full justify-center"
        variant="primary"
        disabled={isLoggingIn}
        onClick={handleLogin}
      >
        {isLoggingIn ? "Logging In" : "Log in"}
      </Button>

      {/* line */}
      <Separator text="OR" />

      {/* google and github login buttons */}
      <div className="flex gap-3">
        {/* Google */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoggingIn}
        >
          Log In
        </Button>

        {/* GitHub */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoggingIn}
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
