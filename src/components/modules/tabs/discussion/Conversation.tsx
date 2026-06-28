import { ScrollArea } from "@/components/ui/ScrollArea";
import { PromptInput } from "./PromptInput";
import { Message } from "./Message";
import { mockDiscussion } from "../../../../mockData/mockDiscussion";
import { MessageType } from "@/types/DiscussionType";

export const Conversation = () => {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="flex-1 px-8 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {mockDiscussion.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <PromptInput />
    </main>
  );
};
