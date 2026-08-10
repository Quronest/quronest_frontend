"use client";

import { KeyboardEvent, useEffect, useRef } from "react";
import clsx from "clsx";
import { ArrowUp, Mic, Paperclip } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({ value, onChange, onSend }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0;

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [value]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (canSend) {
      onSend();
    }
  };

  return (
    <Card
      className={clsx(
        "mx-auto w-full max-w-4xl rounded-3xl border-border",
        "px-4 py-3",
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        rows={1}
        placeholder="Ask Queronest Assistant..."
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className={clsx(
          "max-h-52 min-h-6 w-full resize-none overflow-y-auto",
          "bg-transparent",
          "text-sm leading-6 text-foreground",
          "placeholder:text-neutral",
          "focus:outline-none",
        )}
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="md" className="rounded-full">
            <Paperclip size={18} />
          </Button>

          <Button variant="ghost" size="md" className="rounded-full">
            <Mic size={18} />
          </Button>
        </div>

        <Button
          size="md"
          disabled={!canSend}
          onClick={onSend}
          className={clsx(
            "h-10! w-10! min-w-10! shrink-0 rounded-full p-0!",
            canSend && "shadow-sm",
          )}
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </Button>
      </div>
    </Card>
  );
}
