import { MessageType } from "@/types/DiscussionType";

type Props = {
  message: MessageType;
};

export const UserMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-end" id={`question-${message.id}`}>
      <div className="max-w-2xl space-y-3">
        {message.anchor && (
          <div className="rounded-xl border border-card-hover bg-card px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Reference
            </p>

            <p className="mt-2 line-clamp-3 text-sm italic text-neutral">
              "{message.anchor.selectedText}"
            </p>
          </div>
        )}

        <div className="rounded-2xl bg-primary px-5 py-3 text-background">
          {message.content}
        </div>
      </div>
    </div>
  );
};
