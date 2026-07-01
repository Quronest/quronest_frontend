import React, { createContext, useEffect, useState } from "react";
import { MarkdownProps, MarkdownRenderer } from "../MarkdownRenderer";
import { useTab } from "@/hooks/useTab";
import { ResourceSelection, ResourceTabDataType } from "@/types/WorkspaceType";
import { useAppSelector } from "@/store/store";
import { selectHighlight } from "@/store/features/highlights/highlightSlice";
import { SelectionToolBarProps } from "../SelectionToolBar";

const SelectableMarkdownContext = createContext<{
  selection: ResourceSelection | null;
}>({
  selection: null,
});

type SelectableMarkdownType = {
  resourceId: string;
  selectionToolBar: React.ReactElement<Partial<SelectionToolBarProps>>;
  onSelect?: (selectionData: ResourceSelection | null) => void;
} & MarkdownProps;

export const SelectableMarkdown = ({
  resourceId,
  selectionToolBar: ToolBar,
  onSelect,
  ...markdownProps
}: SelectableMarkdownType) => {
  const [selectionInfo, setSelectionInfo] = useState<ResourceSelection | null>(
    null,
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
      setSelectionInfo(null);
      onSelect?.(null);
      return;
    }
    const selectionData = {
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

  return (
    <SelectableMarkdownContext.Provider value={{ selection: selectionInfo }}>
      <div
        onMouseUp={handleMouseUp}
        className="prose prose-invert w-full prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0"
      >
        <MarkdownRenderer {...markdownProps} />
        {selectionInfo &&
          React.cloneElement(ToolBar, { selection: selectionInfo })}
      </div>
    </SelectableMarkdownContext.Provider>
  );
};
