"use client";

import { useEffect, useRef, useState } from "react";

import { ScrollArea } from "@/components/ui/ScrollArea";

import EmptyState from "./EmptyState";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ChatMessage, ConversationWithMessages } from "./types";
import { TextSelection } from "@/types/WorkspaceType";

type Props = {
  conversation: ConversationWithMessages;
  onMessagesChange: (messages: ChatMessage[]) => void;
};

const getMockResponse = (prompt: string) => `# Mock Response

You asked:

> ${prompt}

This is a **mock AI response**.

## Next Steps

- Connect backend API
- Stream responses
- Enable Ask Doubt
- Enable Analyze

\`\`\`tsx
console.log("Hello Queronest");
\`\`\`
`;

export default function ChatArea({ conversation, onMessagesChange }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    conversation.messages,
  );

  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();

    if (!text) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
      status: "completed",
    };

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      status: "thinking",
    };

    const nextMessages = [...messages, userMessage, assistantMessage];

    setMessages(nextMessages);
    onMessagesChange(nextMessages);
    setInput("");

    setTimeout(() => {
      const updatedMessages = nextMessages.map((message) =>
        message.id === assistantMessage.id
          ? {
              ...message,
              status: "completed" as const,
              content: getMockResponse(text),
            }
          : message,
      );

      setMessages(updatedMessages);
      onMessagesChange(updatedMessages);
    }, 1500);
  };

  const handleAskDoubt = (selection: TextSelection | null) => {
    if (!selection) {
      return;
    }

    console.log(selection);
  };

  const handleAnalyze = (selection: TextSelection | null) => {
    if (!selection) {
      return;
    }

    console.log(selection);
  };

  const handleCopy = async (message: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegenerate = (message: ChatMessage) => {
    console.log(message);
  };

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-[calc(100vh-180px)] items-center justify-center px-8">
              <EmptyState />
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-8 py-8">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  onAskDoubt={handleAskDoubt}
                  onAnalyze={handleAnalyze}
                  onCopy={handleCopy}
                  onRegenerate={handleRegenerate}
                />
              ))}

              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="shrink-0 bg-background px-6 pb-5 pt-3">
        <MessageInput value={input} onChange={setInput} onSend={handleSend} />
      </div>
    </section>
  );
}
