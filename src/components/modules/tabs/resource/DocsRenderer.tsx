import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";

import { useAppSelector } from "@/store/store";
import { selectHighlight } from "@/store/features/highlights/highlightSlice";
import { ResourceSelection, ResourceTabDataType } from "@/types/WorkspaceType";
import { useContext } from "react";
import { TabContext } from "@/context/Tabcontext";
import { useTab } from "@/hooks/useTab";

type DocsRendererProps = {
  onSelection?: (selection: ResourceSelection | null) => void;
};

export const DocsRenderer = ({ onSelection }: DocsRendererProps) => {
  const { tabData } = useTab();
  const { resourceId, markdown } = tabData as ResourceTabDataType;
  const { highlights } = useAppSelector(selectHighlight);
  const resourceHighlights = highlights.filter(
    (highlight) => highlight.anchor?.resourceId === resourceId,
  );

  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (!selection) return;

    const range = selection.getRangeAt(0);

    let element =
      range.commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? range.commonAncestorContainer.parentElement
        : (range.commonAncestorContainer as HTMLElement);

    const blockElement = element?.closest("[data-block-start]");
    const blockText = blockElement?.textContent ?? "";
    const nodeText = range.startContainer.textContent ?? "";
    const nodeStart = blockText.indexOf(nodeText);
    const absoluteStart = nodeStart + range.startOffset;

    const absoluteEnd = nodeStart + range.endOffset;

    const startOffset = Number(blockElement?.getAttribute("data-block-start"));

    const endOffset = Number(blockElement?.getAttribute("data-block-end"));

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
      anchor: {
        selectedText: text,
        resourceId: resourceId,
        block: {
          startOffset,
          endOffset,
        },
        selection: {
          endOffset: absoluteEnd,
          startOffset: absoluteStart,
        },
      },

      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },

      range,
    });
  };

  // apply highlights

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
          h1: (props) => (
            <Heading level={1} {...props} highlights={resourceHighlights} />
          ),
          h2: (props) => (
            <Heading level={2} {...props} highlights={resourceHighlights} />
          ),
          h3: (props) => (
            <Heading level={3} {...props} highlights={resourceHighlights} />
          ),
          p: (props) => (
            <Paragraph {...props} highlights={resourceHighlights} />
          ),
          blockquote: (props) => (
            <BlockQuote highlights={resourceHighlights} {...props} />
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
    </div>
  );
};
