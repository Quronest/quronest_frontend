import { CircleDot, Shield } from "lucide-react";
import React from "react";

export const TestInstructions = () => {
  return (
    <div className="bg-card p-5 rounded-xl border border-border">
      <div className="flex items-center gap-2 text-neutral mb-4">
        <Shield className="h-5 w-5" />
        <span>INSTRUCTIONS</span>
      </div>

      <div className="divide-y divide-border">
        {instructions.map((instruction, index) => (
          <InstructionItem key={index} text={instruction} />
        ))}
      </div>
    </div>
  );
};

type InstructionItemProps = {
  text: string;
};

const instructions = [
  "Read each question carefully before selecting your answer. Some questions contain subtle distinctions.",
  "Some questions have multiple correct answers. All correct options must be selected to earn full marks.",
  "The timer starts the moment you click Start Quiz. The quiz auto-submits when time expires.",
  "Navigation between questions is allowed, but you cannot revisit submitted short-answer responses.",
  "Ensure a stable internet connection. Progress is auto-saved every 30 seconds.",
];

const InstructionItem = ({ text }: InstructionItemProps) => {
  return (
    <div className="flex items-start gap-4 py-4">
      <span className="bg-primary/10 text-primary rounded-full p-2 flex items-center justify-center shrink-0">
        <CircleDot className="h-4 w-4" />
      </span>

      <p className="text-muted-foreground leading-7">{text}</p>
    </div>
  );
};
