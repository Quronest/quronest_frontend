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

  const login = async (credentials: any) =>
    await asyncHandler(() => loginUser(credentials).unwrap());

  const logout = async () => await asyncHandler(() => logoutUser().unwrap());

  const register = async (credentials: any) =>
    await asyncHandler(async () => {
      await registerUser(credentials)
        .unwrap()
        .then(async () => await login({ email: credentials.email, password: credentials.password }));
    });

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
