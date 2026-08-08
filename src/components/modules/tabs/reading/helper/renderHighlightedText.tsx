import { HighlightText } from "@/store/features/highlights/highlightSlice";

export const renderHighlightedText = (
  text: string,
  blockHighlights: HighlightText[],
) => {
  const sortedHighlights = [...blockHighlights].sort(
    (a, b) => a.anchor.selectionOffset.start - b.anchor.selectionOffset.start,
  );

  const parts: React.ReactNode[] = [];

  let current = 0;

  sortedHighlights.forEach((highlight) => {
    const start = highlight.anchor.selectionOffset.start;
    const end = highlight.anchor.selectionOffset.end;

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
