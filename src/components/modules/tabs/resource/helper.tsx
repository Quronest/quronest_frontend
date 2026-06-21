import { HighlightText } from "@/store/features/highlights/highlightSlice";

export const applyHighlights = (
  markdown: string,
  highlights: HighlightText[],
) => {
  let result = markdown;

  highlights.forEach((highlight) => {
    result = result.replaceAll(highlight.text, `<mark>${highlight.text}</mark>`);
  });

  return result;
};
