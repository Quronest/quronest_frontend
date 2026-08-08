import { HeadingItem } from "../types";

export const extractHeadings = (markdown: string): HeadingItem[] => {
  const lines = markdown.split("\n");

  return lines
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;

      const text = line.replace(/^#+\s/, "");

      return {
        id: text.toLowerCase().replace(/\s+/g, "-"),
        text,
        level,
      };
    });
};
