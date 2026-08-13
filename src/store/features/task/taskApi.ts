import { baseApi } from "../baseApi";
import { DailyTaskType } from "@/types/TaskType";

import { JobStatusResponse } from "../user/userType";

export const taskApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDailyTaskById: builder.query<DailyTaskType, string>({
      query: (taskId) => `tasks/${taskId}`,
      providesTags: (result, error, arg) => [
        { type: "Daily_Task" as const, id: arg },
      ],
    }),

    createTaskGenerateJob: builder.mutation<JobStatusResponse, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}/generate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Daily_Task" as const, id: arg },
      ],
    }),

    getReadingTask: builder.query<DailyTaskType, string>({
      query: (taskId) => `tasks/${taskId}/reading`,
      providesTags: (result, error, arg) => [
        { type: "Daily_Task" as const, id: arg },
      ],
    }),

    getQuizTask: builder.query<DailyTaskType, string>({
      query: (taskId) => `tasks/${taskId}/quiz`,
      providesTags: (result, error, arg) => [
        {
          type: "Daily_Task",
          id: arg,
        },
      ],
    }),
  }),
});

export const {
  useGetDailyTaskByIdQuery,
  useLazyGetDailyTaskByIdQuery,
  useGetQuizTaskQuery,
  useGetReadingTaskQuery,
  useLazyGetQuizTaskQuery,
  useLazyGetReadingTaskQuery,
  useCreateTaskGenerateJobMutation,
} = taskApi;
