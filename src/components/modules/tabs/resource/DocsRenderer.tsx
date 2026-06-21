import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";
import { TOC } from "./contentTable/TOC";
import { extractHeadings } from "./contentTable/extractHeadings";

type SelectionInfo = {
  text: string;
  x: number;
  y: number;
};

type DocsRendererProps = {
  markdown: string;
  onSelection?: (selection: SelectionInfo | null) => void;
};

export const DocsRenderer = ({ markdown, onSelection }: DocsRendererProps) => {
  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (!selection) return;

    const rect = selection?.getRangeAt(0).getBoundingClientRect();
    const text = selection.toString().trim();

    if (!text) {
      onSelection?.(null);
      return;
    }

    onSelection?.({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  // const handleMouseUp = () => {
  //   const selection = window.getSelection();

  //   const text = selection?.toString().trim();

  //   console.log(text);
  // };

  return (
    <div
      className="
        prose 
        prose-invert 
        max-w-3xl
        py-12

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
