import { TabResponsiveContainer } from "@/components/ui/TabResponsiveContainer";
import { TabContext } from "@/context/Tabcontext";
import React, { useRef } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TabData } from "@/types/WorkspaceType";
import clsx from "clsx";
import { routes } from "@/hooks/useTabNavigation";

export const TabLayout = ({
  tab,
  className,
}: {
  tab: TabData;
  className: string;
}) => {
  const tabContainerRef = useRef<HTMLDivElement>(null);
//   console.log("Component: ", tab.component)
//   const Component = tab.component;
const route = routes.find((route)=>route.path === tab.path);
const Component = route?.component!
  return (
    <TabContext.Provider value={{ tabData: tab, tabContainerRef }}>
      <TabResponsiveContainer className={clsx("h-full", className)}>
        <ScrollArea className="h-full w-full" ref={tabContainerRef}>
          <Component/>
        </ScrollArea>
      </TabResponsiveContainer>
    </TabContext.Provider>
  );
};
