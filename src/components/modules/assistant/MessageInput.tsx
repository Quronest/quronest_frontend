"use client";

import { KeyboardEvent, useEffect, useRef } from "react";
import clsx from "clsx";
import { ArrowUp, CornerDownRight, Paperclip, X } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import TopicSelector from "@/components/ui/TopicSelector";
import { TOPIC_OPTIONS } from "./mockData";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
  quotedText?: string | null;
  onRemoveQuote?: () => void;
  selectedTopic?: string | null;
  onSelectTopic?: (topic: string | null) => void;
};

export default function MessageInput({
  value,
  onChange,
  onSend,
  inputRef,
  quotedText,
  onRemoveQuote,
  selectedTopic,
  onSelectTopic,
}: Props) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = inputRef || internalRef;

  const canSend =
    value.trim().length > 0 ||
    (quotedText ? quotedText.trim().length > 0 : false);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [value, textareaRef, quotedText, selectedTopic]);

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
      
      {!!selectedTopic && (
        <div className="mb-3 flex items-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-card-hover p-2.5 px-3.5 border border-border/50">
            <p className="text-xs font-medium text-foreground/90">
              Topic:{" "}
              <span className="font-semibold text-foreground">
                {selectedTopic}
              </span>
            </p>
            {onSelectTopic && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 rounded-full p-0! px-0! py-0! flex items-center justify-center text-neutral hover:text-foreground hover:bg-card/80 transition-colors shrink-0"
                onClick={() => onSelectTopic(null)}
                title="Remove Topic"
              >
                <X size={13} strokeWidth={2.5} />
              </Button>
            )}
          </div>
        </div>
      )}

      {!!quotedText && (
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-card-hover p-3 border border-border/50">
          <div className="relative -top-0.5 text-primary shrink-0">
            <CornerDownRight size={22} />
          </div>
          <div className="flex flex-1 items-center justify-between gap-3 min-w-0">
            <p className="line-clamp-3 text-sm text-foreground/90">
              {quotedText}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 rounded-full p-0! px-0! py-0! flex items-center justify-center text-neutral hover:text-foreground hover:bg-card/80 transition-colors shrink-0"
              onClick={onRemoveQuote}
              title="Remove Quote"
            >
              <X size={14} strokeWidth={2} />
            </Button>
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        rows={1}
        placeholder={
          selectedTopic
            ? `Ask about ${selectedTopic}...`
            : "Ask Queronest Assistant..."
        }
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" className="rounded-full">
            <Paperclip size={18} />
          </Button>

   
          <TopicSelector
            options={TOPIC_OPTIONS}
            selectedTopic={selectedTopic}
            onSelectTopic={(topic) => onSelectTopic?.(topic)}
            placeholder="Choose topic"
          />
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
