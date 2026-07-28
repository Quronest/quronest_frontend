import { PrivateLayoutWrapper } from "@/components/layout/PrivateLayoutWrapper";
import SideNavBar from "@/components/modules/layout/SideNavBar";
import React from "react";

type PrivateLayoutType = {
  children: React.ReactNode;
};

function PrivateLayout({ children }: PrivateLayoutType) {
  return (
    <PrivateLayoutWrapper>
      <div className="flex">
        <SideNavBar />
        {children}
      </div>
    </PrivateLayoutWrapper>
  );
}

export default PrivateLayout;
