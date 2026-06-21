import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";

import { applyHighlights } from "./helper";
import { useAppSelector } from "@/store/store";
import { selectHighlight } from "@/store/features/highlights/highlightSlice";
import { ResourceSelection } from "@/types/WorkspaceType";

type DocsRendererProps = {
  markdown: string;
  onSelection?: (selection: ResourceSelection | null) => void;
  resourceId: string;
};

export const DocsRenderer = ({
  markdown,
  onSelection,
  resourceId,
}: DocsRendererProps) => {
  const { highlights } = useAppSelector(selectHighlight);
  const resourceHighlights = highlights.filter(
    (highlight) => highlight.resourceId === resourceId,
  );

  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (!selection) return;

    const range = selection.getRangeAt(0);

    console.log(range.startContainer.parentElement);

    const rect = selection?.getRangeAt(0).getBoundingClientRect();
    const text = selection.toString().trim();

    // multi node selection feature not required as of now
    if (range.startContainer !== range.endContainer) {
      return;
    }

    if (!text) {
      onSelection?.(null);
      return;
    }

    onSelection?.({
      resourceId,
      text,

      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },

      range,
    });
  };

  // apply highlights

  const markdownWithHighlights = applyHighlights(markdown, resourceHighlights);

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
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          p: Paragraph,
          blockquote: BlockQuote,
          code: CodeBlock,
          pre: PreBlock,
          mark: ({ children }) => (
            <mark className="rounded bg-yellow-400/30 px-1 text-foreground">
              {children}
            </mark>
          ),
        }}
      >
        {markdownWithHighlights}
      </ReactMarkdown>
    </div>
  );
};
