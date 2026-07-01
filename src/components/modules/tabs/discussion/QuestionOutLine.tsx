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
};

export const QuestionOutline = ({ className }: QuestionOutlineProps) => {
  const { tabRef, tabData } = useTab();
  const { activeDiscussionId, resourceId } = tabData as DiscussTabDataType;
  const discussion = useAppSelector((state) =>
    state.discussion.discussions.find(
      (discussion) => discussion.id === activeDiscussionId,
    ),
  );

  const questions: MessageType[] | undefined = discussion?.messages.filter(
    (message) => message.role === "user",
  );

  const handleScroll = (messageId: string) => {
    tabRef.current
      ?.querySelector(`#message-${CSS.escape(messageId)}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };
  return (
    <aside
      className={clsx(
        "flex h-full flex-col border-l border-card-hover bg-card transition-all duration-300 w-60",
        className,
      )}
    >
      <div
        className={clsx(
          "flex h-14 items-center border-b border-card-hover",
          "justify-between px-4",
        )}
      >
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Questions</h2>
          <ListTree size={18} className="text-primary" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
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
      </div>
    </aside>
  );
};
