import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";
import React from "react";

interface NoPlansScheduledProps {
  startDateStr: string;
  onGenerate: () => void;
}

export const NoPlansScheduled = ({ startDateStr, onGenerate }: NoPlansScheduledProps) => {
  return (
    <Card className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-2xl bg-card/20 backdrop-blur-md text-center max-w-2xl mx-auto my-12 py-12 px-6 space-y-6 shadow-sm border-dashed">
      <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
        <Calendar className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-foreground">
          No Daily Plans Scheduled
        </h2>
        <p className="text-neutral text-sm max-w-md mx-auto leading-relaxed">
          You don't have any daily plans generated for the week of{" "}
          <span className="text-primary font-semibold">{startDateStr}</span>.
          Let's generate your learning roadmap using our AI engine!
        </p>
      </div>
      <Button
        onClick={onGenerate}
        className="font-bold bg-primary/80! hover:bg-primary! transition-colors px-6 py-2.5"
      >
        Generate Daily Plans
      </Button>
    </Card>
  );
};
