import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";

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
      className="
        prose 
        prose-invert 
        max-w-3xl

        prose-pre:bg-transparent
        prose-pre:p-0
        prose-pre:m-0
  "
      onMouseUp={handleMouseUp}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          p: Paragraph,
          blockquote: BlockQuote,
          code: CodeBlock,
          pre: PreBlock,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
