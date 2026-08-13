import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Tag } from "@/components/ui/Tag";
import { Tasktype } from "@/types/TaskType";

import React from "react";
import Link from "next/link";

type TaskItemType = {
  task: Tasktype;
  dailyPlanId: string;
};

export const TasklistItemComponent = ({ task, dailyPlanId }: TaskItemType) => {
  const durationInMins = task?.duration / 60;
  const progresslabel = task.progress.toString();
  return (
    <Card>
      <div>
        <span>Task: </span>
        <span className="font-semibold">{task.title}</span>
      </div>
      <div className="flex items-center gap-2 mb-5">
        {/* duration */}
        <div className="text-neutral pr-5 border-r border-neutral">
          {durationInMins} mins
        </div>

        {/* tags */}
        <div className="flex items-center gap-3 my-3">
          {task?.tags.map((tag) => (
            <Tag label={tag.label} tagType={tag?.type} key={tag.label} />
          ))}
        </div>
      </div>
      {/* Progress and button */}
      <div className="relative w-full flex flex-col justify-center">
        <Link href={`/workspace/${dailyPlanId}`} className="w-full">
          <Button
            className="justify-center w-full"
            size="sm"
            hover={true}
            active={true}
          >
            <CircularProgress
              value={task?.progress}
              className="absolute -left-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 bg-card rounded-full self-start"
              label={progresslabel}
              showLabel={true}
              size={60}
              isDate={false}
            />
            <span>View</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};
