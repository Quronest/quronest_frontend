"use client";

import { Award, Code2, Flame, Users } from "lucide-react";

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
    },
    {
      title: "Level",
      value: stats.level,
      subtitle: "Advanced",
      icon: Award,
      color: "text-amber-400",
    },
    {
      title: "Current Stack",
      value: stats.techStack,
      subtitle: "Full Stack",
      icon: Code2,
      color: "text-green-400",
    },
    {
      title: "Current Streak",
      value: stats.streak,
      subtitle: "Days",
      icon: Flame,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            hoverEffect="light"
            className="flex items-center justify-between p-5"
          >
            <div>
              <p className="text-sm text-neutral">{item.title}</p>

              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

              <p className="mt-1 text-xs text-neutral">{item.subtitle}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/40">
              <Icon size={28} className={item.color} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsSection;
