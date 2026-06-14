import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { H1 } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";

export const DocsRenderer = ({
  markdown,
}: {
  markdown: string;
}) => {
  return (
    <div className="prose prose-invert w-full max-w-3xl mx-auto">
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