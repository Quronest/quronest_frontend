"use client";

import clsx from "clsx";
import { Award, Flame, Users } from "lucide-react";

import { Card } from "@/components/ui/Card";

import type { UserStats } from "@/types/ProfileType";

interface StatsSectionProps {
  stats: UserStats;
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  const statCards = [
    {
      title: "Group",
      value: stats.group,
      subtitle: "Elite Cohort",
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Phase",
      value: stats.level,
      subtitle: "Current Progress",
      icon: Award,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Current Streak",
      value: stats.streak,
      subtitle: "Days",
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {statCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            hoverEffect="light"
            className="group p-6 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral">{item.title}</p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-neutral">{item.subtitle}</p>
              </div>

              <div
                className={clsx(
                  "h-16 w-16 shrink-0 rounded-2xl",
                  "flex items-center justify-center",
                  "transition-transform duration-300 group-hover:scale-105",
                  item.bg,
                )}
              >
                <Icon className={clsx("h-8 w-8", item.color)} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsSection;
