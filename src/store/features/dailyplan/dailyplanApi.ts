import { baseApi } from "../baseApi";
import { DailyPlanType } from "./dailyplanType";
import { JobStatusResponse } from "../user/userType";

export const dailyplanApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    generateDailyPlans: builder.mutation<JobStatusResponse, void>({
      query: () => ({
        url: "daily-plans/generate-next-plans",
        method: "POST",
      }),
      invalidatesTags: ["Daily_Plan"],
    }),

    getDailyPlansByRange: builder.query<DailyPlanType[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => ({
        url: "daily-plans/by-date-range",
        params: { startDate, endDate },
      }),
      providesTags: ["Daily_Plan"],
    }),

    getDailyPlanById: builder.query<DailyPlanType, string>({
      query: (id) => `daily-plans/${id}`,
      providesTags: (result, error, id) => [{ type: "Daily_Plan", id }],
    }),
  }),
});

export const {
  useGenerateDailyPlansMutation,
  useGetDailyPlansByRangeQuery,
  useLazyGetDailyPlansByRangeQuery,
  useGetDailyPlanByIdQuery,
  useLazyGetDailyPlanByIdQuery,
} = dailyplanApi;
