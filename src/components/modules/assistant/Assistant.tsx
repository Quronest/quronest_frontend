"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

import ChatArea from "./ChatArea";
import ConversationSidebar from "./ConversationSidebar";
import { mockConversations } from "./mockData";
import { ChatMessage, ConversationWithMessages } from "./types";

export default function Assistant() {
  const [conversations, setConversations] =
    useState<ConversationWithMessages[]>(mockConversations);

  const [selectedConversationId, setSelectedConversationId] = useState(
    mockConversations[0]?.id ?? "",
  );

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === selectedConversationId,
      ) ?? conversations[0],
    [conversations, selectedConversationId],
  );

  const handleNewConversation = () => {
    const conversation: ConversationWithMessages = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [conversation, ...prev]);
    setSelectedConversationId(conversation.id);
  };

  const handleMessagesChange = (messages: ChatMessage[]) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== selectedConversationId) {
          return conversation;
        }

        const firstUserMessage = messages.find(
          (message) => message.role === "user",
        );

        return {
          ...conversation,
          messages,
          updatedAt: new Date().toISOString(),
          title: firstUserMessage
            ? firstUserMessage.content.slice(0, 50)
            : "New Chat",
        };
      }),
    );
  };

  if (!selectedConversation) {
    return null;
  }

  return (
    <div
      className={clsx("flex h-screen w-full overflow-hidden", "bg-background")}
    >
      <ConversationSidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onConversationSelect={setSelectedConversationId}
        onNewConversation={handleNewConversation}
      />

      <main
        className={clsx(
          "flex min-w-0 flex-1 flex-col overflow-hidden",
          "bg-background",
        )}
      >
        <ChatArea
          conversation={selectedConversation}
          onMessagesChange={handleMessagesChange}
        />
      </main>
    </div>
  );
}
