"use client"

import SideNavBar from "@/components/SideNavBar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const options: Option[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed", disabled: true },
  { label: "Archived", value: "archived" },
];

const TestingPage = () => {
  const [option, setOption] = useState<string>("all");

  return (
    <div className="h-screen flex">
      <SideNavBar />
      <div className="flex items-center justify-center gap-5 h-full w-full">
        <Button size="sm">test Button</Button>
        <Button variant="outline" size="md">
          outline
        </Button>
        <Input type="password" className="max-w-xl" placeholder="test me" />
        <Select
          options={options}
          value={option}
          onChange={(val: string) => setOption(val)}
        />
      </div>
    </div>
  );
};

export default TestingPage;
