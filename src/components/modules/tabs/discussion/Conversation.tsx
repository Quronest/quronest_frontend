import { ScrollArea } from "@/components/ui/ScrollArea";
import { Message } from "./Message";
import {  DiscussionType, MessageType } from "@/types/DiscussionType";
import { MailQuestion, Send, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { QuestionOutline } from "./QuestionOutLine";
import { useEffect, useRef, useState } from "react";
import { TextArea } from "@/components/ui/TextArea";
import { useTab } from "@/hooks/useTab";
import { DiscussionSelection, DiscussTabDataType } from "@/types/WorkspaceType";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addMessage } from "@/store/features/discussion/discussionSlice";
import { mockDiscussion } from "@/mockData/mockDiscussion";

export const Conversation = () => {
  // store and TabContext operations
  const dispatch = useAppDispatch();
  const { tabData } = useTab();

  const { resourceId, activeDiscussionId, draftMessage } =
    tabData as DiscussTabDataType;

  const discussions = useAppSelector((state) =>
    state.discussion.discussions.filter(
      (discussion) => discussion?.reference?.resourceId === resourceId,
    ),
  );

  const activeDiscussion =
    discussions.find((discussion) => discussion.id === activeDiscussionId) ??
    mockDiscussion;

  // helper variables
  let timer: NodeJS.Timeout | null = null;
  const mockMessage: MessageType = {
    id: "",
    content: "",
    createdAt: new Date().toISOString(),
    anchor: {
      resourceId: resourceId,
    },
    role: "user",
  };
  const draftMessageData = draftMessage ?? mockMessage;

  // Refs, states and effects
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [selection, setSelection] = useState<DiscussionSelection | null>(null);
  const [messageData, setMessageData] = useState<MessageType | null>(
    draftMessageData,
  );
  const [showQuestion, setShowQuestion] = useState(false);
  useEffect(() => {
    if (draftMessage) {
      setMessageData(draftMessage);
    }
    textareaRef.current?.focus();
  }, [draftMessage]);

  // Functions
  const handleMouseEnter = () => {
    timer = setTimeout(() => {
      setShowQuestion(true);
    }, 700);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer!);
    setShowQuestion(false);
  };

  const handleAddMessage = () => {
    if (!messageData) return;
    const finalMessage = {
      ...messageData,
      id: crypto.randomUUID(),
    };
    dispatch(
      addMessage({ discussionId: activeDiscussionId!, message: finalMessage }),
    );
    const mockReplyMessage: MessageType = {
      ...finalMessage,
      role: "assistant",
      id: crypto.randomUUID(),
    };
    dispatch(
      addMessage({
        discussionId: activeDiscussionId!,
        message: mockReplyMessage,
      }),
    );

    setMessageData(mockMessage);
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden relative">
      <ScrollArea className="flex-1 px-8 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {activeDiscussion?.messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* <PromptInput /> */}
      <div className="mx-auto w-full max-w-4xl my-5 rounded-3xl border border-card-hover bg-card p-3">
        {!!messageData?.anchor?.selectedText && (
          <div className="mb-3 rounded-2xl bg-card-hover p-3">
            <div className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
              Reference Text
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="line-clamp-3 text-sm text-foreground/90">
                {messageData.anchor.selectedText}
              </p>
              <Button variant="nav" className="bg-transparent!">
                <X />
              </Button>
            </div>
          </div>
        )}
        <TextArea
          ref={textareaRef}
          value={messageData?.content ?? ""}
          onChange={(event) =>
            setMessageData((messageData) => {
              return { ...messageData!, content: event.target.value };
            })
          }
          placeholder="Write a note, thought, or reminder..."
          className="max-h-30 border-none! bg-card! p-0! pl-2!"
        />

        <div className="mt-3 flex justify-end">
          <Button
            size="sm"
            className="gap-2 shadow-[0_10px_25px_rgba(29,173,192,0.2)]"
            onClick={handleAddMessage}
            disabled={!messageData?.content.trim()}
          >
            <Send size={16} />
            <span>Send</span>
          </Button>
        </div>
      </div>

      <div
        className="absolute top-5 right-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showQuestion ? (
          <QuestionOutline />
        ) : (
          <Button variant="icon">
            <MailQuestion />
          </Button>
        )}
      </div>
    </main>
  );
};
