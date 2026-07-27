import React from "react";
import { TestOverviewHeader } from "./TestOverviewHeader";
import { TestDetails } from "./TestDetails.tsx";
import { TestInstructions } from "./TestInstructions";
import { TestPerformance } from "./TestPerformance";
import { TopicsCovered } from "./TopicsCovered";
import { BookOpen, ChartBar, Play } from "lucide-react";
import Button from "@/components/ui/Button";

const topicsCovered = [
  "Generics",
  "Mapped Types",
  "Conditional Types",
  "Decorators",
  "Utility Types",
  "Infer",
  "Template Literals",
];

export const TestOverviewSection = ({ onStart }: { onStart?: () => void }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 mt-8">
      <TestOverviewHeader
        level="easy"
        title="TypeScript Advanced Patterns"
        description="Test your understanding of generics, conditional types, mapped types, decorators, and advanced compiler internals."
      />
      <div className="grid grid-cols-3 gap-5">
        {/* Details and instruction */}
        <div className="space-y-5 col-span-2">
          <TestDetails />
          <TestInstructions />
        </div>

        {/* performance, action buttons and topics covered */}
        <div className="flex flex-col gap-5">
          <TestPerformance />
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="md"
              className="justify-center w-full rounded-lg gap-3 items-center brightness-80!"
              onClick={onStart}
            >
              <Play fill="white"/>
              Start Quiz
            </Button>
            <Button
              variant="nav"
              size="lg"
              className="justify-center w-full rounded-lg border-border! border! gap-3 items-center"
            >
              <ChartBar size={20}/>
              Review Previous Attempts
            </Button>
            
          </div>
          <TopicsCovered topics={topicsCovered} className="flex-1"/>
        </div>
      </div>
    </div>
  );
};
