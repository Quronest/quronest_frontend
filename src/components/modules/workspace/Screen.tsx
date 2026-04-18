"use client";
import { TabRefDataType } from "@/types/TabRefDataType";
import React, { useState } from "react";
import { Tab } from "./Tab";
import Button from "@/components/ui/Button";
import { X } from "lucide-react";
import clsx from "clsx";

type Screenprops = {
  id?: string;
  defaultActiveTab: TabRefDataType;
  defaultTabList: TabRefDataType[];
};

export const Screen = ({
  id = "left",
  defaultActiveTab,
  defaultTabList,
}: Screenprops) => {
  const [activeTab, setActiveTab] = useState<TabRefDataType>(defaultActiveTab);
  const [tabList, setTabList] = useState<TabRefDataType[]>(defaultTabList);

  const handleClick = (id: string) => {
    const newActiveTab = tabList.find((tab) => tab.id === id);
    if (newActiveTab) setActiveTab(newActiveTab);
  };

  const handleCloseTab = (id: string) => {
    const updatedTabList = tabList.filter((tab) => tab.id !== id);
    if (updatedTabList) setTabList(updatedTabList);
    if (activeTab.id === id) {
      setActiveTab(tabList[0]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* simple Tabslist */}
      <div className="flex items-center h-10 border-b-2 border-card-hover bg-card">
        {tabList.length > 0 &&
          tabList.map((tab) => (
            <div
              key={tab.id}
              className={clsx(
                " justify-between border-r border-card-hover flex gap-5 items-center cursor-pointer",

                tab.id === activeTab.id
                  ? "bg-background border-background!"
                  : " hover:bg-card-hover",
              )}
              onClick={() => handleClick(tab.id!)}
            >
              <span className="text-sm ml-2">{tab.label}</span>
              <Button
                variant="nav"
                className="w-fit! h-fit! bg-transparent! rounded-full! p-0.5! hover:bg-card-hover! mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab.id!);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
      </div>
      <div className="flex-1">
        <Tab tab={activeTab} />
      </div>
    </div>
  );
};
