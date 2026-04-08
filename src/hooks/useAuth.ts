"use client";
import {
  useGetProfileQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
} from "@/store/features/user/userApi";

import { asyncHandler } from "@/utils/asyncHandler";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const { data: user, isLoading } = useGetProfileQuery();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const [registerUser, { isLoading: isSigningIn }] = useRegisterUserMutation();

  const login = async (credentials: any) => {
    const [data, error] = await asyncHandler(() =>
      loginUser(credentials).unwrap(),
    );
    return { data, error };
  };

  const logout = async () => {
    const [data, error] = await asyncHandler(() => logoutUser().unwrap());
    return { data, error };
  };

  const register = async (credentials: any) => {
    const [data, error] = await asyncHandler(async () => {
      console.log("req body: ", credentials);
      await registerUser(credentials).unwrap();
      console.log("register complete");
      await loginUser(credentials).unwrap();
      console.log("Login complete");
      router.push("/home");

      return true;
    });

    return { data, error };
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoadingUser: isLoading,

    login,
    logout,
    register,

    isLoggingIn,
    isLoggingOut,
    isSigningIn,
  };
};
