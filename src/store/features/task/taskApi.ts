import { baseApi } from "../baseApi";
import { DailyTaskDto } from "./taskType";
import { JobStatusResponse } from "../user/userType";

export const taskApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDailyTaskById: builder.query<DailyTaskDto, string>({
      query: (taskId) => `tasks/${taskId}`,
      providesTags: (result, error, arg) => [{ type: "Daily_Task" as const, id: arg }],
    }),
    createTaskGenerateJob: builder.mutation<JobStatusResponse, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}/generate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Daily_Task" as const, id: arg }],
    }),
  }),
});

export const {
  useGetDailyTaskByIdQuery,
  useLazyGetDailyTaskByIdQuery,
  useCreateTaskGenerateJobMutation,
} = taskApi;
