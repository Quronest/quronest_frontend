import Button from "@/components/ui/Button";
import { TabRefDataType } from "@/types/WorkspaceType";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";

// export const TabItem = (tab:TabRefDataType) => {
//   return (
//     <div
//       key={tab.id}
//       className={clsx(
//         " justify-between border-r border-card-hover flex gap-5 items-center cursor-pointer",

//         tab.id === activeTabId
//           ? "bg-background border-background!"
//           : " hover:bg-card-hover",
//       )}
//       onClick={() => handleSwitchTab(tab.id!)}
//     >
//       <span className="text-sm ml-2 line-clamp-1">{tab.label}</span>
//       <Button
//         variant="nav"
//         className="w-fit! h-fit! bg-transparent! rounded-full! p-0.5! hover:bg-card-hover! mr-2"
//         onClick={(e) => {
//           e.stopPropagation();
//           dispatch(setActivePane({ paneId: id }));
//           handleCloseTab(tab.id!);
//         }}
//       >
//         <X size={16} />
//       </Button>
//     </div>
//   );
// };
