import { AcademicData, PersonalData } from "@/types/ProfileType";
import { baseApi } from "../baseApi";
import { User } from "./userType";
import { PersonalFormSchemaType } from "@/schemas/personalFormSchema";
import { AcademicFormSchemaType } from "@/schemas/academicFormSchema";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: true,
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
      query: (data: PersonalFormSchemaType) => {
        const transformed = {
          interested_domains: data.interested_domains
            ? data.interested_domains
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          skills: data.skills
            ? data.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          primary_goal: data.primary_goal,
          experience: data.experience,
          description: data.personal_description,
        };
        return {
          url: "user/personal-data",
          method: "POST",
          body: transformed,
        };
      },
      invalidatesTags: ["User"],
    }),
    setAcademicData: builder.mutation({
      query: (data: AcademicFormSchemaType) => {
        const transformed = {
          institute_name: data.institute_name,
          course: data.course,
          grade: data.grade,
          description: data.academic_description,
        };
        return {
          url: "user/academic-data",
          method: "POST",
          body: transformed,
        };
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
  useSetAcademicDataMutation,
} = userApi;
