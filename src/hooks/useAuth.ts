"use client";
import {
  useGetProfileQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
} from "@/store/features/user/userApi";

import { asyncHandler } from "@/utils/asyncHandler";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { baseApi } from "@/store/features/baseApi";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useGetProfileQuery();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const [registerUser, { isLoading: isSigningIn }] = useRegisterUserMutation();

  const login = async (credentials: any) =>
    await asyncHandler(() =>
      loginUser(credentials)
        .unwrap()
        .then(() => router.push("/home")),
    );
  const logout = async () =>
    await asyncHandler(async () => {
      await logoutUser().unwrap();
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    });

  const register = async (credentials: any) =>
    await asyncHandler(async () => {
      await registerUser(credentials)
        .unwrap()
        .then(
          async () =>
            await login({
              email: credentials.email,
              password: credentials.password,
            }),
        );
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
