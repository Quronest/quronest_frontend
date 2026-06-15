import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { H1 } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";

type SelectionInfo = {
  text: string;
  rect: DOMRect;
};

type DocsRendererProps = {
  markdown: string;
  onSelection?: (selection: SelectionInfo | null) => void;
};

export const DocsRenderer = ({ markdown, onSelection }: DocsRendererProps) => {
  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (!selection) return;

    const text = selection.toString().trim();

    if (!text) {
      onSelection?.(null);
      return;
    }

    const rect = selection.getRangeAt(0).getBoundingClientRect();

    onSelection?.({
      text,
      rect,
    });
  };

  return (
    <div
      className="prose prose-invert w-full max-w-2xl mx-auto"
      onMouseUp={handleMouseUp}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: H1,
          p: Paragraph,
          blockquote: BlockQuote,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
