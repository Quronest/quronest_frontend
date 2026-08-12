import { baseApi } from "../baseApi";
import { DailyPlanDto } from "./dailyplanType";
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

    getDailyPlansByRange: builder.query<DailyPlanDto[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => ({
        url: "daily-plans/by-date-range",
        params: { startDate, endDate },
      }),
      providesTags: ["Daily_Plan"],
    }),
  }),
});

export const {
  useGenerateDailyPlansMutation,
  useGetDailyPlansByRangeQuery,
  useLazyGetDailyPlansByRangeQuery,
} = dailyplanApi;
