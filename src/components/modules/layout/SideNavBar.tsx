"use client";
import { Home, IdCardLanyard, LogOut, Settings, TreeDeciduous, User } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import Button from "../../ui/Button";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const navopts: Record<string, any>[] = [
  {
    label: "Home",
    key: "home",
    icon: <Home size={24}/>,
  },
  {
    label: "Workspace",
    key: "workspace",
    icon: <IdCardLanyard size={24} />,
  },
  {
    label: "Logout",
    key: "logout",
    icon: <LogOut size={24}/>,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <Settings size={24}/>,
  },
  {
    label: "Profile",
    key: "profile",
    icon: <User size={24}/>,
  },
];

const SideNavBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div
      className={clsx(
        "h-screen border-r border-card-hover bg-background w-18 flex flex-col items-center gap-3 overflow-hidden pb-5",
        className,
      )}
    >
      <span className="font-bold text-primary bg-background flex items-center justify-center p-5">
        <TreeDeciduous size={50} />
      </span>
      <div className="flex flex-col justify-between items-center h-full">
        <div className="space-y-2">
          {navopts.map((opt, index) => {
            if (index < 2)
              return (
                <NavIcon
                  key={index}
                  label={opt.label}
                  icon={opt.icon}
                  optKey={opt.key}
                />
              );
            return null;
          })}
        </div>
        <div className="space-y-2">
          {navopts.map((opt, index) => {
            if (index >= 2)
              return (
                <NavIcon
                  key={index}
                  label={opt.label}
                  icon={opt.icon}
                  optKey={opt.key}
                />
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

const NavIcon = ({
  label,
  icon,
  optKey,
}: {
  label: string;
  icon: ReactNode;
  optKey: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname.includes(optKey);
  const {logout} = useAuth();

  return (
    <Button
      variant="nav"
      className={clsx(isSelected && "text-primary! bg-background/30!")}
      tooltip={label}
      tooltipPlace="left"
      onClick={optKey !== "logout" ? () => router.push(`/${optKey}`) : () => {logout()}}
    >
      {icon}
    </Button>
  );
};

export default SideNavBar;
