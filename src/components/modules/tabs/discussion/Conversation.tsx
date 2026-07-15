import { ScrollArea } from "@/components/ui/ScrollArea";
import { Message } from "./Message";
import { MessageType } from "@/types/DiscussionType";
import { CornerDownRight, MailQuestion, Send, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { QuestionOutline } from "./QuestionOutLine";
import { useEffect, useRef, useState } from "react";
import { TextArea } from "@/components/ui/TextArea";
import { useTab } from "@/hooks/useTab";
import { DiscussTabDataType } from "@/types/WorkspaceType";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addMessage } from "@/store/features/discussion/discussionSlice";
import { mockDiscussion } from "@/mockData/mockDiscussion";
import clsx from "clsx";

export const Conversation = () => {
  // store and TabContext operations
  const dispatch = useAppDispatch();
  const { tabData, taskId, tabRef } = useTab();

  const { activeDiscussionId, draftMessage } = tabData as DiscussTabDataType;

  const discussions = useAppSelector((state) =>
    state.discussion.discussions.filter(
      (discussion) => discussion?.taskId === taskId,
    ),
  );

  const activeDiscussion =
    discussions.find((discussion) => discussion.id === activeDiscussionId) ??
    mockDiscussion;

  const questions: MessageType[] | undefined =
    activeDiscussion?.messages.filter((message) => message.role === "user");

  // helper variables
  let timer: NodeJS.Timeout | null = null;
  const mockMessage: MessageType = {
    id: "",
    content: "",
    createdAt: new Date().toISOString(),
    discussionId: activeDiscussionId,
    role: "user",
  };

  const draftMessageData = draftMessage ?? mockMessage;

  // Refs, states and effects
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleScroll = (messageId: string) => {
    tabRef.current
      ?.querySelector(`#message-${CSS.escape(messageId)}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleRemoveReferenceText = () => {
    const { anchor, ...rest } = messageData!;
    setMessageData(rest);
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden relative">
      <ScrollArea className="flex-1 px-8 py-8 ">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {activeDiscussion?.messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      {/* <PromptInput /> */}
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className=" mt-5 rounded-3xl border border-card-hover bg-card p-3">
          {!!messageData?.anchor?.selectedText && (
            <div className="mb-3 rounded-2xl bg-card-hover p-3 flex items-center gap-3">
              <div className="text-white relative -top-2">
                <CornerDownRight size={25} />
              </div>
              <div className="flex items-center justify-between gap-3 flex-1">
                <p className="line-clamp-3 text-sm text-foreground/90">
                  {messageData.anchor.selectedText}
                </p>
                <Button
                  variant="nav"
                  className="bg-transparent!"
                  onClick={handleRemoveReferenceText}
                >
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
      </div>

      <QuestionItemBars questions={questions}>
        <QuestionOutline
          questions={questions}
          handleScroll={handleScroll}
          className={clsx("group-hover:block hidden ")}
        />
      </QuestionItemBars>
    </main>
  );
};

const QuestionItemBars = ({
  questions,
  children,
}: {
  questions: MessageType[];
  children: React.ReactNode;
}) => {
  if (questions.length < 3) return;
  return (
    <div className="space-y-1.5 h-fit w-fit absolute top-1/2 -translate-y-1/2 right-5 group">
      {questions.map((question) => {
        return (
          <div key={question.id} className="h-px w-4 bg-white rounded-sm" />
        );
      })}
      {children}
    </div>
  );
};
