import { WorkspaceSideBar } from "@/components/modules/workspace/WorkspaceSideBar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden ">
      <WorkspaceSideBar />
      <div className="flex-1 min-w-0 h-full">
        {children}
      </div>
    </div>
  );
};

export default layout;
