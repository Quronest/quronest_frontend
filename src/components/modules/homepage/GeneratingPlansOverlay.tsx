import { Card } from "@/components/ui/Card";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface GeneratingPlansOverlayProps {
  pollingStatus: string;
}

export const GeneratingPlansOverlay = ({ pollingStatus }: GeneratingPlansOverlayProps) => {
  return (
    <Card className="flex flex-col items-center justify-center p-12 border border-border/50 rounded-2xl bg-card/30 backdrop-blur-md shadow-sm text-center space-y-6 max-w-lg mx-auto my-10">
      <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {pollingStatus === "review" ? "Analyzing Goals..." : "Generating Plans..."}
        </h2>
        <p className="text-neutral mt-2 text-sm max-w-xs mx-auto leading-relaxed">
          {pollingStatus === "review"
            ? "We are analyzing your learning progress and goals to structure your next steps."
            : "Our AI is crafting your personalized daily plans. This will take a few seconds."}
        </p>
      </div>
    </Card>
  );
};
