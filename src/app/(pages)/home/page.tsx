import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { PageContainer } from "@/components/ui/PageContainer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tag } from "@/components/ui/Tag";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <PageContainer className="space-y-3 pt-20">
      <WelcomeComponent />
      <CurrentTaskComponent />
      <MockWeekProgress/>
    </PageContainer>
  );
};

export default HomePage;

const CurrentTaskComponent = () => {
  return (
    <Card className="w-full flex flex-col justify-between h-50 relative">
      {/* task title */}
      <div>
        <h1 className="text-2xl">
          <span className="text-accent2">Task 1:</span> Build a Todo App
        </h1>
        {/* tags */}
        <div className="flex items-center gap-2 mt-2">
          <Tag label="Build" />
          <Tag label="Docs" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <ProgressBar value={58} />
        <Button className="font-bold shrink-0">Resume Work</Button>
      </div>
    </Card>
  );
};

const WelcomeComponent = () => {
  return (
    <div className="space-y-2 mb-10">
      <h1 className="text-4xl font-semibold ">Welcome Rounak !!</h1>
      <p className="text-neutral">
        <span className="text-primary text-lg">Day 12 </span>of your web dev
        journey
      </p>
    </div>
  );
};

const MockWeekProgress = () => (
  <div className="flex items-center justify-between mx-auto max-w-4xl">
    <div>
      <ArrowLeft />
    </div>
    <div className="flex items-center justify-center gap-10 my-10">
      <CircularProgress value={58} showLabel label="19" />
      <CircularProgress value={88} showLabel label="20" />
      <CircularProgress value={28} showLabel label="21" />
      <CircularProgress value={58} showLabel label="22" />
      <CircularProgress value={100} showLabel label="23" />
      <CircularProgress value={28} showLabel label="24" />
      <CircularProgress value={28} showLabel label="25" />
    </div>
    <div>
      <ArrowRight />
    </div>
  </div>
);
