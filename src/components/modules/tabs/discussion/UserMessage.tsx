import { MessageType } from "@/types/DiscussionType";
import { useState } from "react";
import { TextSelection } from "@/types/WorkspaceType";
import clsx from "clsx";
import { SelectableMarkdown } from "../reading/markdown/SelectableMarkdown";
import { SelectionToolBar } from "../reading/SelectionToolBar";

type Props = {
  message: MessageType;
};

export const UserMessage = ({ message }: Props) => {
  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );
  return (
    <div
      className="flex justify-end"
      id={`message-${message.id}`}
      data-message-id={message.id}
    >
      <div className="max-w-2xl space-y-0">
        {message.anchor?.selectedText && (
          <div className="rounded-t-xl border border-card-hover bg-card px-4 py-3">
            <p className="mt-2 line-clamp-3 text-sm italic text-neutral">
              "{message.anchor.selectedText}"
            </p>
          </div>
        )}

        {/* <div
          className={clsx(
            " bg-primary px-5 py-3 text-background",
            message.anchor?.selectedText ? "rounded-b-2xl" : "rounded-2xl",
          )}
        >
          {message.content}
        </div> */}
        <SelectableMarkdown
          markdown={message.content!}
          referenceId={message.discussionId!}
          onSelect={setSelectionInfo}
          className={clsx(
            "rounded-2xl bg-primary px-5 py-3 text-background",
            message.anchor?.selectedText ? "rounded-b-2xl" : "rounded-2xl",
          )}
          selectionToolBar={<SelectionToolBar selection={selectionInfo} />}
        />
      </div>
    </div>
  );
};
