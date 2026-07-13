import { HighlightText } from "@/store/features/highlights/highlightSlice";

export const getBlockHighlights = (
  highlights: HighlightText[],
  startOffset?: number,
  endOffset?: number,
) => {
  return highlights.filter(
    (highlight) =>
      highlight.anchor.block.startOffset === startOffset &&
      highlight.anchor.block.endOffset === endOffset,
  );
};
