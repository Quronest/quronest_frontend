import { MessageType } from "@/types/DiscussionType";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";

type MessageProps = {
  message: MessageType;
};

export const Message = ({ message }: MessageProps) => {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  }

  return <AssistantMessage message={message} />;
};
