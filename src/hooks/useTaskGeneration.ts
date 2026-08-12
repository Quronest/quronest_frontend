import { useState, useRef } from "react";
import {
  useLazyGetDailyTaskByIdQuery,
  useCreateTaskGenerateJobMutation,
} from "@/store/features/task/taskApi";
import { DailyTaskDto } from "@/store/features/task/taskType";
import { useLazyGetJobStatusQuery } from "@/store/features/user/userApi";

export type TaskPollingStatus =
  | "idle"
  | "loading"     // fetching initial task
  | "generating"  // job is in progress (polling)
  | "success"     // completed and fetched
  | "error";

export const useTaskGeneration = (intervalMs = 2000) => {
  const [status, setStatus] = useState<TaskPollingStatus>("idle");
  const [error, setError] = useState<any>(null);
  const [task, setTask] = useState<DailyTaskDto | null>(null);

  const [triggerGetTask] = useLazyGetDailyTaskByIdQuery();
  const [triggerGenerateTask] = useCreateTaskGenerateJobMutation();
  const [triggerGetJobStatus] = useLazyGetJobStatusQuery();

  const activeTaskIdRef = useRef<string | null>(null);

  const loadTask = async (taskId: string): Promise<DailyTaskDto | null> => {
    activeTaskIdRef.current = taskId;
    setStatus("loading");
    setError(null);
    setTask(null);

    try {
      // 1. Get the task
      const taskResult = await triggerGetTask(taskId, false).unwrap();
      
      // If task already has content generated, we don't need to generate or poll
      if (taskResult.content) {
        setTask(taskResult);
        setStatus("success");
        return taskResult;
      }

      // 2. Determine jobId
      let jobId = taskResult.job_id;

      if (!jobId) {
        // Create task generate job
        const genResult = await triggerGenerateTask(taskId).unwrap();
        jobId = genResult.job_id;
      }

      if (!jobId) {
        throw new Error("Failed to get or start a generation job for the task.");
      }

      // 3. Poll the job status
      setStatus("generating");

      let completed = false;
      let failed = false;

      while (!completed && !failed) {
        // Check if user clicked another task in the meantime
        if (activeTaskIdRef.current !== taskId) {
          return null;
        }

        await new Promise((resolve) => setTimeout(resolve, intervalMs));

        if (activeTaskIdRef.current !== taskId) {
          return null;
        }

        const jobResult = await triggerGetJobStatus(jobId, false).unwrap();

        if (jobResult.job_status === "COMPLETED") {
          completed = true;
        } else if (jobResult.job_status === "FAILED") {
          failed = true;
        }
      }

      if (failed) {
        throw new Error("Task generation job failed on backend.");
      }

      // 4. Fetch the final task with content
      if (activeTaskIdRef.current !== taskId) {
        return null;
      }

      const finalTask = await triggerGetTask(taskId, false).unwrap();
      setTask(finalTask);
      setStatus("success");
      return finalTask;
    } catch (err) {
      console.error("Task loading/polling error:", err);
      setError(err);
      setStatus("error");
      return null;
    }
  };

  const reset = () => {
    activeTaskIdRef.current = null;
    setStatus("idle");
    setTask(null);
    setError(null);
  };

  return {
    loadTask,
    reset,
    status,
    task,
    error,
  };
};
