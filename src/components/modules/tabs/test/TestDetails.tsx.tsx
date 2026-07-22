import { Award, BookOpen, Clock3, FileQuestionMark } from "lucide-react";
import React from "react";

export const TestDetails = () => {
  return (
    <div className="bg-card p-5 rounded-xl border border-border">
      {/* quiz details cards */}
      <div className="grid grid-cols-2 gap-5">
        {questionDetails.map((detail) => (
          <QuestionInfoCard {...detail} />
        ))}
      </div>
    </div>
  );
};

type QuestionInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  info: string;
};

const questionDetails: QuestionInfoCardProps[] = [
  {
    icon: <Clock3 className="h-5 w-5" />,
    label: "Duration",
    info: "45 minutes",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Questions",
    info: "10 questions",
  },
  {
    icon: <Award className="h-5 w-5" />,
    label: "Passing Score",
    info: "70 / 100",
  },
  {
    icon: <FileQuestionMark className="h-5 w-5" />,
    label: "Difficulty Level",
    info: "Easy",
  },
];

const QuestionInfoCard = ({ icon, label, info }: QuestionInfoCardProps) => {
  return (
    <div className="bg-card-hover rounded-lg p-3 flex items-center gap-4 w-full">
      <span className="bg-primary/10 backdrop-blur-md text-primary p-2 flex items-center justify-center rounded-md">
        {icon}
      </span>
      <div className="space-y-2">
        <p className="text-neutral text-md">{label}</p>
        <h3 className="text-lg ">{info}</h3>
      </div>
    </div>
  );
};
