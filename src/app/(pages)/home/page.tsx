import { CurrentTaskComponent } from "@/components/modules/homepage/CurrentTaskComponent";
import { MockWeekProgress } from "@/components/modules/homepage/MockWeekProgress";
import { WelcomeComponent } from "@/components/modules/homepage/WelcomeComponent";
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
      <MockWeekProgress />
    </PageContainer>
  );
};

export default HomePage;
