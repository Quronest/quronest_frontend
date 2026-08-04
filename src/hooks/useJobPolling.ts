"use client";

import { useState, useRef } from "react";
import { useLazyGetJobStatusQuery } from "@/store/features/user/userApi";

export type JobPollingStatus =
  | "idle"
  | "review"
  | "creating"
  | "success"
  | "error";

export interface GenericJobStartResponse {
  job_id: string;
  job_status: string;
}

export interface UseJobPollingProps<FinalData> {
  startTrigger: () => Promise<GenericJobStartResponse>;
  fetchFinalTrigger?: () => Promise<FinalData>;
  intervalMs?: number;
}

export const useJobPolling = <FinalData>({
  startTrigger,
  fetchFinalTrigger,
  intervalMs = 2000,
}: UseJobPollingProps<FinalData>) => {
  const [status, setStatus] = useState<JobPollingStatus>("idle");
  const [finalData, setFinalData] = useState<FinalData | null>(null);
  const [error, setError] = useState<any>(null);

  const startedRef = useRef(false);

  const [triggerGetJobStatus] = useLazyGetJobStatusQuery();

  const start = async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    setStatus("review");
    setError(null);
    setFinalData(null);

    try {
      const startResult = await startTrigger();
      const jobId = startResult?.job_id;

      setStatus("creating");

      let completed = false;
      let failed = false;

      while (!completed && !failed) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));

        const jobResult = await triggerGetJobStatus(jobId, false).unwrap();

        if (jobResult.job_status === "COMPLETED") {
          completed = true;
        } else if (jobResult.job_status === "FAILED") {
          failed = true;
        }
      }

      if (failed) {
        setStatus("error");
        return;
      }

      if (fetchFinalTrigger) {
        const finalResult = await fetchFinalTrigger();
        setFinalData(finalResult);
      }

      setStatus("success");
    } catch (err) {
      console.error("Job polling error:", err);
      setError(err);
      setStatus("error");
    }
  };

  const reset = () => {
    startedRef.current = false;
    setStatus("idle");
    setFinalData(null);
    setError(null);
  };

  return {
    start,
    reset,
    status,
    finalData,
    error,
  };
};
