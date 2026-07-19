import { HighlightText } from "@/store/features/highlights/highlightSlice";

export const getBlockHighlights = (
  highlights: HighlightText[],
  startOffset?: number,
  endOffset?: number,
) => {
  return highlights.filter(
    (highlight) =>
      highlight.anchor.blockOffset.start === startOffset &&
      highlight.anchor.blockOffset.end === endOffset,
  );
};
