import { HighlightText } from "@/store/features/highlights/highlightSlice";

export const renderHighlightedText = (
  text: string,
  blockHighlights: HighlightText[],
) => {
  const sortedHighlights = [...blockHighlights].sort(
    (a, b) => a.anchor.selection.startOffset - b.anchor.selection.startOffset,
  );

  const parts: React.ReactNode[] = [];

  let current = 0;

  sortedHighlights.forEach((highlight) => {
    const start = highlight.anchor.selection.startOffset;
    const end = highlight.anchor.selection.endOffset;

    if (start > current) {
      parts.push(text.slice(current, start));
    }

    parts.push(
      <mark key={highlight.id} className="rounded bg-[#fff59b] px-1">
        {text.slice(start, end)}
      </mark>,
    );

    current = end;
  });

  if (current < text.length) {
    parts.push(text.slice(current));
  }

  return parts;
};
