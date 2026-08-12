import { baseApi } from "../baseApi";
import { User, JobStatusResponse, UserJourneyResponse } from "./userType";
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

    setPersonalData: builder.mutation<User, PersonalFormSchemaType>({
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userApi.util.updateQueryData("getProfile", undefined, (draft) => {
                if (draft) {
                   Object.assign(draft, data);
                }
              })
            );
          }
        } catch (err) {
          console.error("Failed to update profile cache programmatically:", err);
        }
      },
    }),
    setAcademicData: builder.mutation<User, AcademicFormSchemaType>({
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userApi.util.updateQueryData("getProfile", undefined, (draft) => {
                if (draft) {
                  Object.assign(draft, data);
                }
              })
            );
          }
        } catch (err) {
          console.error("Failed to update profile cache programmatically:", err);
        }
      },
    }),

    startJourney: builder.mutation<JobStatusResponse, void>({
      query: () => ({
        url: "user/start-journey",
        method: "POST",
      }),
    }),

    getJobStatus: builder.query<JobStatusResponse, string>({
      query: (jobId) => `jobs/${jobId}`,
    }),

    getCurrentJourney: builder.query<UserJourneyResponse, void>({
      query: () => "user/current-journey",
      providesTags: ["User_Journey"],
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
  useStartJourneyMutation,
  useLazyGetJobStatusQuery,
  useGetCurrentJourneyQuery,
  useLazyGetCurrentJourneyQuery,
} = userApi;
