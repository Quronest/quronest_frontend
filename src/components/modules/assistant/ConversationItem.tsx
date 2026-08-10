"use client";

import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";

import Button from "@/components/ui/Button";

import { Conversation } from "./types";

type Props = {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
};

export default function ConversationItem({
  conversation,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        "group flex items-center rounded-xl transition-all duration-200",
        active ? "bg-card-hover" : "hover:bg-card-hover",
      )}
    >
      <button
        onClick={onClick}
        title={conversation.title}
        className="flex-1 truncate rounded-xl px-3 py-3 text-left"
      >
        <p
          className={clsx(
            "truncate text-sm",
            active
              ? "font-medium text-foreground"
              : "text-neutral group-hover:text-foreground",
          )}
        >
          {conversation.title}
        </p>
      </button>

      <Button
        variant="ghost"
        size="sm"
        className={clsx(
          "mr-2 h-8 w-8 rounded-lg p-0 transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        <MoreHorizontal size={16} />
      </Button>
    </div>
  );
}
