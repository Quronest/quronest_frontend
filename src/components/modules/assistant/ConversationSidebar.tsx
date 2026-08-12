"use client";

import clsx from "clsx";
import { MessageSquarePlus } from "lucide-react";

import Button from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";

import ConversationItem from "./ConversationItem";
import { Conversation } from "./types";

type Props = {
  conversations: Conversation[];
  selectedConversationId: string;
  onConversationSelect: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (id: string) => void;
};

export default function ConversationSidebar({
  conversations,
  selectedConversationId,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation,
}: Props) {
  return (
    <aside
      className={clsx(
        "flex h-screen w-80 shrink-0 flex-col overflow-hidden",
        "border-r border-border bg-card",
      )}
    >
      <div className="shrink-0 border-b border-border p-4">
        <Button
          variant="primary"
          onClick={onNewConversation}
          className="w-full gap-2"
        >
          <MessageSquarePlus size={18} />
          <span>New Chat</span>
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-3 py-3">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral/70">
            Recent Chats
          </p>

          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-center text-xs text-neutral">
              No chat history yet
            </p>
          ) : (
            <div className="space-y-0.5">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  active={conversation.id === selectedConversationId}
                  onClick={() => onConversationSelect(conversation.id)}
                  onDelete={onDeleteConversation}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

