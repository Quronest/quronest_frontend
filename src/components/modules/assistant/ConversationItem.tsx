"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { MoreHorizontal, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import { Conversation } from "./types";

type Props = {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
  onDelete?: (id: string) => void;
};

export default function ConversationItem({
  conversation,
  active,
  onClick,
  onDelete,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={clsx(
        "group relative flex items-center rounded-lg transition-all duration-150 cursor-pointer",
        active
          ? "bg-card-hover text-foreground font-medium border-l-2 border-primary pl-2.5 pr-2 py-1.5"
          : "hover:bg-card-hover/70 text-neutral hover:text-foreground px-3 py-1.5",
      )}
    >
      <button
        onClick={onClick}
        title={conversation.title}
        className="flex-1 truncate text-left focus:outline-none"
      >
        <p
          className={clsx(
            "truncate text-xs leading-5",
            active ? "font-semibold text-foreground" : "text-foreground/80 group-hover:text-foreground",
          )}
        >
          {conversation.title}
        </p>
      </button>

      {!!onDelete && (
        <div className="relative shrink-0" ref={menuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className={clsx(
              "h-7 w-7 rounded-md p-0 transition-opacity",
              active || showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            <MoreHorizontal size={14} />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-xl border border-border bg-card p-1 shadow-lg backdrop-blur-md">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onDelete(conversation.id);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Chat</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

