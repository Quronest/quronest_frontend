import { baseApi } from "../baseApi";
import { DailyTaskType } from "@/types/TaskType";

import { JobStatusResponse } from "../user/userType";
import {
  QuizSubmitRequestType,
  QuizSubmitResponseType,
} from "@/types/QuizTaskType";
import { url } from "inspector";

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

    submitQuiz: builder.mutation<
      QuizSubmitResponseType,
      { quizAnswerData: QuizSubmitRequestType; taskId: string }
    >({
      query: ({ quizAnswerData, taskId }) => ({
        url: `/tasks/${taskId}/quiz/submit`,
        method: "POST",
        body: quizAnswerData,
      }),
      invalidatesTags: (result, error, arg, meta) => [
        {
          type: "Daily_Task",
          id: arg.taskId,
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
  useSubmitQuizMutation
} = taskApi;
