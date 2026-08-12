"use client";

import { useState } from "react";
import clsx from "clsx";
import { Bot, Copy, RefreshCcw } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { MarkdownRenderer } from "@/components/modules/tabs/resource/MarkdownRenderer";
import { SelectableMarkdown } from "@/components/modules/tabs/resource/markdown/SelectableMarkdown";
import { SelectionToolBar } from "@/components/modules/tabs/resource/SelectionToolBar";

import { ChatMessage } from "./types";
import { TextSelection } from "@/types/WorkspaceType";

type Props = {
  message: ChatMessage;
  onAskDoubt?: (selection: TextSelection | null) => void;
  onAnalyze?: (selection: TextSelection | null) => void;
  onCopy?: (message: ChatMessage) => void;
  onRegenerate?: (message: ChatMessage) => void;
};

export default function Message({
  message,
  onAskDoubt,
  onAnalyze,
  onCopy,
  onRegenerate,
}: Props) {
  const [selection, setSelection] = useState<TextSelection | null>(null);

  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end gap-1.5">
        {!!message.topic && (
          <span
            className={clsx(
              "inline-flex items-center rounded-full border border-border/50 bg-card-hover px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 shadow-sm",
            )}
          >
            <span>Topic: {message.topic}</span>
          </span>
        )}
        <Card
          className={clsx(
            "max-w-3xl rounded-3xl border-border px-5 py-4",
            "bg-card",
          )}
        >
          <div className="prose prose-invert max-w-none text-sm leading-7 text-foreground prose-p:my-0 prose-blockquote:my-2">
            <MarkdownRenderer
              markdown={message.content}
              showCopyButton={false}
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
        <Bot size={20} className="text-primary" />
      </div>

      <div className="min-w-0 flex-1">
        {message.status === "thinking" ? (
          <p className="py-2 text-sm text-neutral">Thinking...</p>
        ) : (
          <SelectableMarkdown
            markdown={message.content}
            referenceId={message.id}
            onSelect={setSelection}
            selectionToolBar={
              <SelectionToolBar selection={selection} onAskDoubt={onAskDoubt} />
            }
          />
        )}

        {message.status === "completed" && (
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onCopy?.(message)}>
              <Copy size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRegenerate?.(message)}
            >
              <RefreshCcw size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
