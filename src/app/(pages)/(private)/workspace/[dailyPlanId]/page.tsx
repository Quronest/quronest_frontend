import { WorkspaceLayout } from "@/components/modules/workspace/WorkspaceLayout";
import React from "react";

type PageProps = {
  params: Promise<{ dailyPlanId: string }>;
};

export default async function WorkSpacePage({ params }: PageProps) {
  const { dailyPlanId } = await params;
  return <WorkspaceLayout dailyPlanId={dailyPlanId} />;
}
