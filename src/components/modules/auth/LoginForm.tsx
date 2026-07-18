"use client";

import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Separator } from "@/components/ui/Separator";
import FormCard from "./FormCard";
import TextLink from "@/components/ui/TextLink";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FieldValues, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormSchemaType } from "@/schemas/LoginFormSchema";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (field: string, value: string) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const onSubmit = async (data: FieldValues) => {
    await login(data);
    router.push("/home");
  };

  // const handleLogin = async () => {
  //   await login({ data: form });
  //   router.push("/home");
  // };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-center">Log In</h1>

      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          disabled={isLoggingIn}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          disabled={isLoggingIn}
          error={errors.password?.message}
        />

        <div className="text-right mt-1">
          <TextLink href="/forgot-password">Forgot Password?</TextLink>
        </div>
      </div>

      {/* Login button */}
      <Button
        type="submit"
        className="w-full justify-center"
        variant="primary"
        disabled={isSubmitting}
      >
        {isLoggingIn ? "Logging In" : "Log in"}
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
          <GoogleIcon />
          <span className="text-md font-semibold">Google</span>
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
    </FormCard>
  );
}

export default LoginForm;
