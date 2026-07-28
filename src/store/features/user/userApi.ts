import { AcademicData, PersonalData } from "@/types/ProfileType";
import { baseApi } from "../baseApi";
import { User } from "./userType";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data: {
        email: string;
        password: string;
        fullname: string;
        username: string;
      }) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query<User, void>({
      query: () => "user/profile",
      providesTags: ["User"],
    }),

    setPersonalData: builder.mutation({
      query: (data: PersonalData) => {
        url: "user/personal-data";
        method: "POST";
        body: data;
      },
      invalidatesTags: ["User"],
    }),
    setAcademicData: builder.mutation({
      query: (data: AcademicData) => {
        url: "user/academic-data";
        method: "POST";
        body: data;
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
  useSetPersonalDataMutation,
  useSetAcademicDataMutation
} = userApi;
