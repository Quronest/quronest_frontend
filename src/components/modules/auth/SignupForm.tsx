"use client";

import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/Separator";
import FormCard from "./FormCard";
import TextLink from "@/components/ui/TextLink";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  SignUpFormSchemaType,
} from "@/schemas/SignUpFormSchema";
import Input from "@/components/ui/Input";

function SignupForm() {
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

  // const [form, setForm] = useState({
  //   fullname: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleRegister = async () => {
  //   const { confirmPassword, ...registerData } = form;
  //   await registerUser({ data: registerData });
  // };

  // const handleChange = (field: string, value: string) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const onSubmit = async (data: SignUpFormSchemaType) => {
    await registerUser({ data });
    reset();
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
