import { WorkspaceSideBar } from "@/components/modules/workspace/WorkspaceSideBar";
import { PageContainer } from "@/components/ui/PageContainer";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen ">
      <WorkspaceSideBar />
      <div className="flex-1 h-full">
        {children}
      </div>
    </div>
  );
};

export default layout;
