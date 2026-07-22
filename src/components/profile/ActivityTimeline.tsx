"use client";

import { Award, BookOpen, CheckCircle2, Code2, GitBranch } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

import type {
  ActivityIcon,
  ActivityStatus,
  ActivityTimelineItem,
} from "@/types/ProfileType";

interface ActivityTimelineProps {
  activities: ActivityTimelineItem[];
  selectedDate: string;
}

const iconMap: Record<ActivityIcon, React.ElementType> = {
  book: BookOpen,
  git: GitBranch,
  code: Code2,
  check: CheckCircle2,
  award: Award,
};

const getTagType = (status: ActivityStatus) => {
  switch (status) {
    case "Completed":
      return "accent";
    case "In Progress":
      return "primary";
    case "Started":
      return "secondary";
    default:
      return "accent";
  }
};

const ActivityTimeline = ({
  activities,
  selectedDate,
}: ActivityTimelineProps) => {
  const selectedActivities = activities.filter(
    (activity) => activity.date === selectedDate,
  );

  return (
    <Card border="transparent" className="border border-border p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Activity Timeline</h2>

        <p className="mt-1 text-sm text-neutral">
          Recent learning activity and milestones
        </p>
      </div>

      {/* Selected Date */}
      <div className="mb-8 flex items-center gap-4">
        <h3 className="whitespace-nowrap text-lg font-semibold">
          {selectedDate}
        </h3>

        <div className="h-px flex-1 bg-border" />
      </div>

      {selectedActivities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-neutral">No activity on this day.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {selectedActivities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            const isLast = index === selectedActivities.length - 1;

            return (
              <div key={activity.id} className="flex gap-5">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={18} />
                  </div>

                  {!isLast && <div className="mt-3 w-px flex-1 bg-border" />}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    !isLast ? "border-b border-border pb-8" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {activity.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-neutral">
                        {activity.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activity.tags.map((tag) => (
                          <Tag key={tag} label={tag} />
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Tag
                        label={activity.status}
                        tagType={getTagType(activity.status)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ActivityTimeline;
