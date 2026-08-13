"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  useStartJourneyMutation,
  useGetCurrentJourneyQuery,
  userApi,
} from "@/store/features/user/userApi";
import { useJobPolling } from "@/hooks/useJobPolling";
import { useAppDispatch } from "@/store/store";

const mapGroup = (group?: string) => {
  switch (group) {
    case "GROUP_A":
      return "Group A";
    case "GROUP_B":
      return "Group B";
    case "GROUP_C":
      return "Group C";
    default:
      return group || "Not Assigned";
  }
};

const mapPhase = (phase?: string) => {
  switch (phase) {
    case "PHASE_1":
      return "Foundation";
    case "PHASE_2":
      return "Intermediate";
    case "PHASE_3":
      return "Advanced";
    default:
      return phase || "Not Assigned";
  }
};

export const StartJourney = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [startJourney] = useStartJourneyMutation();

  const { start, status } = useJobPolling<void>({
    startTrigger: () => startJourney().unwrap(),
  });

  const { data: journeyData } = useGetCurrentJourneyQuery(undefined, {
    skip: status !== "success",
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (status === "success") {
      dispatch(userApi.util.invalidateTags(["User", "User_Journey"]));
    }
  }, [status, dispatch]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-xl border-border p-10">
        {(status === "review" || status === "creating") && (
          <>
            <div className="mb-10 flex justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <LoaderCircle className="h-24 w-24 animate-spin text-primary/50" />
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold text-foreground">
              {status === "review"
                ? "Reviewing Your Details"
                : "Creating Your Journey"}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center leading-7 text-neutral">
              {status === "review"
                ? "Please wait while we review the information you've provided."
                : "We're generating your personalized learning roadmap. This will only take a few seconds."}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-green-500/10 p-5">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold text-foreground">
              Your Journey Started 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center leading-7 text-neutral">
              Your personalized learning journey has been created successfully.
              You're all set to begin learning.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Card className="border-border p-5">
                <p className="text-sm text-neutral">Current Group</p>

                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {journeyData ? mapGroup(journeyData.group) : "Loading..."}
                </h3>
              </Card>

              <Card className="border-border p-5">
                <p className="text-sm text-neutral">Current Phase</p>

                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {journeyData ? mapPhase(journeyData.phase) : "Loading..."}
                </h3>
              </Card>
            </div>

            <Button
              className="mt-10 flex w-full items-center justify-center gap-2"
              onClick={() => router.push("/home")}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-red-500/10 p-5">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold text-foreground">
              Failed to Create Journey
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center leading-7 text-neutral">
              Something went wrong while creating your personalized journey.
              Please try again.
            </p>

            <Button
              className="mt-10 w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </>
        )}
      </Card>
    </main>
  );
};
