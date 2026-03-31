import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Tag } from "@/components/ui/Tag";
import { Tasktype } from "@/types/Tasktype";
import React from "react";

type TaskItemType = {
  task: Tasktype;
};

export const TasklistItemComponent = ({ task }: TaskItemType) => {
  const durationInMins = task?.duration % 60;
  return (
    <Card hoverEffect="move">
      <div>
        <span>Task: </span>
        <span className="font-semibold">{task.title}</span>
      </div>
      {/* duration */}
      <div className="text-neutral">{durationInMins}</div>
      {/* tags */}
      <div className="flex items-center gap-3 my-3">
        {task?.tags.map((tag) => (
          <Tag label={tag.label} tagType={tag?.type} key={tag.label} />
        ))}
      </div>
      {/* Progress and button */}
      {/* <div className="relative w-full">
        <CircularProgress value={task?.progress} className="absolute left-0 top-0 border border-card"/>
        <Button className="pl-4 justify-center w-full">View</Button>
      </div> */}
      <Button className="flex items-center gap-2 w-full">
        <CircularProgress value={task?.progress} />
        View
      </Button>
    </Card>
  );
};
