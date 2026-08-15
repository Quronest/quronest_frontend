import { PageContainer } from "@/components/ui/PageContainer";
import { LoaderCircle } from "lucide-react";
import React from "react";

export const HomeLoading = () => {
  return (
    <PageContainer className="flex flex-col items-center justify-center pt-20">
      <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      <span className="text-neutral mt-4 font-medium">
        Loading your schedule...
      </span>
    </PageContainer>
  );
};
