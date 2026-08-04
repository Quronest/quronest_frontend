import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MarkdownProps, MarkdownRenderer } from "../MarkdownRenderer";
import { SelectionAnchor, TextSelection } from "@/types/WorkspaceType";
import clsx from "clsx";
import { getNodeOffset } from "../helper/getNodeOffset";
import AnnotationLayer from "../AnnotationLayer";

const SelectableMarkdownContext = createContext<{
  selection: TextSelection | null;
}>({
  selection: null,
});

type SelectableMarkdownType = {
  referenceId: string;
  selectionToolBar: React.ReactNode;
  onSelect?: (selectionData: TextSelection | null) => void;
  anchors?: SelectionAnchor[];
  className?: string;
} & MarkdownProps;

export const SelectableMarkdown = ({
  referenceId,
  selectionToolBar: toolBar,
  onSelect,
  className,
  anchors = [],
  ...markdownProps
}: SelectableMarkdownType) => {
  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!containerRef) return;
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);

    let element =
      range.commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? range.commonAncestorContainer.parentElement
        : (range.commonAncestorContainer as HTMLElement);

    const blockElement = element?.closest<HTMLElement>("[data-block-start]");

    const nodeStart = getNodeOffset(blockElement!, range.startContainer);

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
      setSelectionInfo(null);
      onSelect?.(null);
      return;
    }
    const selectionData: TextSelection = {
      selectedText: text,

      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },

      range,

      blockOffset: {
        start: startOffset,
        end: endOffset,
      },

      selectionOffset: {
        start: absoluteStart,
        end: absoluteEnd,
      },

      createAnchor: (referenceId, type) => ({
        referenceId: referenceId,
        type,
        blockOffset: {
          start: startOffset,
          end: endOffset,
        },

        selectionOffset: {
          start: absoluteStart,
          end: absoluteEnd,
        },
        selectedText: text,
      }),
    };
    setSelectionInfo(selectionData);
    onSelect?.(selectionData);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

      if (!selection?.toString().trim()) {
        setSelectionInfo(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);
  console.log("selectable markdown rendered");
  return (
    <SelectableMarkdownContext.Provider value={{ selection: selectionInfo }}>
      <div
        onMouseUp={handleMouseUp}
        className={clsx(
          "prose prose-invert w-full prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 ",
          className,
          "relative",
        )}
        ref={containerRef}
      >
        <MarkdownRenderer {...markdownProps} />
        {selectionInfo && toolBar}
        <AnnotationLayer
          anchors={anchors}
          containerRef={containerRef}
        />
      </div>
    </SelectableMarkdownContext.Provider>
  );
};
