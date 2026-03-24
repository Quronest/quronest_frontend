import SideNavBar from "@/components/modules/layout/SideNavBar";
import React from "react";

type AppShellPropType = {
  children: React.ReactNode;
};

function AppShelllayout({ children }: AppShellPropType) {
  return (
    <div className="flex">
      <SideNavBar />
      {children}
    </div>
  );
}

export default AppShelllayout;
