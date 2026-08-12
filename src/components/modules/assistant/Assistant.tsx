"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

import ChatArea from "./ChatArea";
import ConversationSidebar from "./ConversationSidebar";
import { mockConversations } from "./mockData";
import { ChatMessage, ConversationWithMessages } from "./types";

const fallbackConversation: ConversationWithMessages = {
  id: "default-empty",
  title: "New Chat",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [],
};

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
      ) ?? conversations[0] ?? fallbackConversation,
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

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      if (selectedConversationId === id) {
        setSelectedConversationId(updated[0]?.id ?? "");
      }
      return updated;
    });
  };

  const handleMessagesChange = (messages: ChatMessage[]) => {
    setConversations((prev) => {
      const exists = prev.some((c) => c.id === selectedConversation.id);
      if (!exists) {
        const newConv = {
          ...selectedConversation,
          messages,
          updatedAt: new Date().toISOString(),
          title: messages.find((m) => m.role === "user")?.content.slice(0, 50) || "New Chat",
        };
        setSelectedConversationId(newConv.id);
        return [newConv, ...prev];
      }

      return prev.map((conversation) => {
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
      });
    });
  };

  return (
    <div
      className={clsx("flex h-screen w-full overflow-hidden", "bg-background")}
    >
      <ConversationSidebar
        conversations={conversations}
        selectedConversationId={selectedConversation.id}
        onConversationSelect={setSelectedConversationId}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
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

