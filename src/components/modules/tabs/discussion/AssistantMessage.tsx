import { MarkdownRenderer } from "../resource/MarkdownRenderer";
import { MessageType } from "@/types/DiscussionType";

type AssistantMessageProps = {
  message: MessageType;
};

export const AssistantMessage = ({ message }: AssistantMessageProps) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-wider text-primary">
        AI Response
      </span>

      <div className="rounded-2xl border border-card-hover bg-transparent px-6 py-4">
        <MarkdownRenderer markdown={message.content} />
      </div>
    </div>
  );
};
