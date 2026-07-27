import SideNavBar from "@/components/modules/layout/SideNavBar";
import React from "react";

type PrivateLayoutType = {
  children: React.ReactNode;
};

function PrivateLayout({ children }: PrivateLayoutType) {
  return (
    <div className="flex">
      <SideNavBar />
      {children}
    </div>
  );
}

export default PrivateLayout;
