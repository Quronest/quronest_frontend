"use client";

import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FormCard from "./FormCard";
import TextLink from "@/components/ui/TextLink";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormSchemaType } from "@/schemas/SignUpFormSchema";
import Input from "@/components/ui/Input";

const GOOGLE_LOGIN_URL =
  `${process.env.NEXT_PUBLIC_API_URI}/backend/oauth2/authorization/google`;
const GITHUB_LOGIN_URL =
  `${process.env.NEXT_PUBLIC_API_URI}/backend/oauth2/authorization/github`;

function SignupForm() {
  const router = useRouter();
  const { register: registerUser, isSigningIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormSchemaType>({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormSchemaType) => {
    const { confirmPassword, ...registerData } = data;
    await registerUser(registerData);
    reset();
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  const handleGithubLogin = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-center">Create Account</h1>

      {/* Inputs */}
      <div>
        <Input
          {...register("fullname")}
          placeholder="Full Name"
          disabled={isSigningIn}
          error={errors.fullname?.message}
        />
      </div>

      <div>
        <Input
          {...register("username")}
          placeholder="Username"
          disabled={isSigningIn}
          error={errors.username?.message}
        />
      </div>

      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          disabled={isSigningIn}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
          disabled={isSigningIn}
          error={errors.password?.message}
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          disabled={isSigningIn}
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Signup button */}
      <Button
        type="submit"
        className="w-full justify-center"
        variant="primary"
        // onClick={handleRegister}
        disabled={isSubmitting}
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
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          <span className="text-md font-semibold">Google</span>
        </Button>

        {/* GitHub */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGithubLogin}
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
