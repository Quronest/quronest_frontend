import React from "react";
import { TabContainer } from "@/components/ui/TabContainer";
import { TabHeader } from "@/components/ui/TabHeader";

export const CodingTab = () => {
  return (
    <TabContainer>
      <TabHeader
        title="Coding Task"
        subtitle="Work on your coding problem here"
      />
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-xl font-semibold text-neutral">
          Welcome to coding tab
        </p>
      </div>
    </TabContainer>
  );
};
export default CodingTab;
