import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";
import { HighlightText } from "@/store/features/highlights/highlightSlice";

type MarkdownRendererProps = {
  markdown: string;
  highlights?: HighlightText[];
};

export const MarkdownRenderer = ({
  markdown,
  highlights = [],
}: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={{
        h1: (props) => <Heading level={1} {...props} highlights={highlights} />,

        h2: (props) => <Heading level={2} {...props} highlights={highlights} />,

        h3: (props) => <Heading level={3} {...props} highlights={highlights} />,

        p: (props) => <Paragraph {...props} highlights={highlights} />,

        blockquote: (props) => (
          <BlockQuote {...props} highlights={highlights} />
        ),

        code: CodeBlock,

        pre: PreBlock,

        mark: ({ children }) => (
          <mark className="rounded bg-yellow-400/30 px-1 text-foreground">
            {children}
          </mark>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
