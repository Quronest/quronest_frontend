import { Award, BookOpen, Clock3, FileQuestionMark } from "lucide-react";
import React from "react";

export const TestDetails = ({
  duration,
  questionsCount,
  level,
}: {
  duration?: number;
  questionsCount?: number;
  level?: string;
}) => {
  const details = [
    {
      icon: <Clock3 className="h-5 w-5" />,
      label: "Duration",
      info: duration ? `${duration} minutes` : "45 minutes",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Questions",
      info: questionsCount ? `${questionsCount} questions` : "10 questions",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Passing Score",
      info: "70 / 100",
    },
    {
      icon: <FileQuestionMark className="h-5 w-5" />,
      label: "Difficulty Level",
      info: level ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() : "Easy",
    },
  ];

  return (
    <div className="bg-card p-5 rounded-xl border border-border">
      {/* quiz details cards */}
      <div className="grid grid-cols-2 gap-5">
        {details.map((detail, index) => (
          <QuestionInfoCard key={index} {...detail} />
        ))}
      </div>
    </div>
  );
};

const QuestionInfoCard = ({
  icon,
  label,
  info,
}: {
  icon: React.ReactNode;
  label: string;
  info: string;
}) => {
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
