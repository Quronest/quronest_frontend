import { Home, Settings, TreeDeciduous, User } from "lucide-react";
import React, { ReactNode } from "react";
import Button from "../../ui/Button";
import clsx from "clsx";

const navopts: Record<string, any>[] = [
  {
    label: "Home",
    key: "home",
    icon: <Home />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <Settings />,
  },
  {
    label: "Profile",
    key: "profile",
    icon: <User />,
  },
];

const SideNavBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "h-screen border-r border-primary bg-card w-20 flex flex-col items-center gap-4 overflow-hidden",
        className,
      )}
    >
      <span className="font-bold text-primary bg-background flex items-center justify-center p-5">
        <TreeDeciduous size={50} />
      </span>
      {navopts.map((opt, index) => (
        <NavIcon key={index} label={opt.label} icon={opt.icon} />
      ))}
    </div>
  );
};

const NavIcon = ({ label, icon }: { label: string; icon: ReactNode }) => {
  return (
    <Button variant="nav" className="">
      <span>{icon}</span>
      <span className="text-[10px]">{label}</span>
    </Button>
  );
};

export default SideNavBar;
