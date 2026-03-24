import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tag } from "@/components/ui/Tag";

export const CurrentTaskComponent = () => {
  return (
    <Card className="w-full flex flex-col justify-between h-50 relative">
      {/* task title */}
      <div>
        <h1 className="text-2xl">
          <span className="text-accent2">Task 1:</span> Build a Todo App
        </h1>
        {/* tags */}
        <div className="flex items-center gap-2 mt-2">
          <Tag label="Build" />
          <Tag label="Docs" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <ProgressBar value={58} />
        <Button className="font-bold shrink-0">Resume Work</Button>
      </div>
    </Card>
  );
};
