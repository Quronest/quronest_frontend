import clsx from "clsx";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, ListTree } from "lucide-react";
import { useTab } from "@/hooks/useTab";
import { DiscussTabDataType } from "@/types/WorkspaceType";
import { useAppSelector } from "@/store/store";
import { MessageType } from "@/types/DiscussionType";
import { Message } from "./Message";

type QuestionOutlineProps = {
  className?: string;
  questions: MessageType[];
  handleScroll: (messageId: string) => void;
};

export const QuestionOutline = ({
  className,
  questions,
  handleScroll,
}: QuestionOutlineProps) => {
  
  return (
    <aside
      className={clsx(
        "flex h-fit max-h-100 w-60",
        "overflow-y-scroll flex-col border-l border-card-hover bg-card transition-all duration-300",
        "absolute right-0 top-1/2 -translate-y-1/2",
        className,
      )}
    >
      <div className="space-y-2 p-3">
        {questions?.map((question) => {
          return (
            <Button
              key={question.id}
              variant="list"
              onClick={() => handleScroll(question.id)}
            >
              {question.content}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
