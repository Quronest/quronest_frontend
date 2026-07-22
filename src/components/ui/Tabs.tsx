"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface TabItem {
  label: ReactNode;
  href: string;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

const Tabs = ({ items, className }: TabsProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tabs"
      className={clsx(
        "flex w-full items-center border-b border-border",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "relative flex flex-1 items-center justify-center",
              "px-6 py-4",
              "text-sm font-semibold",
              "transition-colors duration-300",
              isActive ? "text-primary" : "text-neutral hover:text-foreground",
            )}
          >
            {item.label}

            <span
              aria-hidden="true"
              className={clsx(
                "absolute right-0 -bottom-px left-0 h-0.5",
                "bg-primary",
                "origin-center transition-transform duration-300",
                isActive ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default Tabs;
