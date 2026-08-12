"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  resizeContainerRef?: React.RefObject<HTMLElement | Window | null>;
} & MarkdownProps;

export const SelectableMarkdown = ({
  referenceId,
  selectionToolBar: toolBar,
  onSelect,
  className,
  anchors = [],
  resizeContainerRef,
  ...markdownProps
}: SelectableMarkdownType) => {
  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep a ref to onSelect to avoid stale closures in event listeners
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Track mouse button state to avoid selectionchange race condition
  const isMouseDownRef = useRef(false);

  const handleMouseDown = () => {
    isMouseDownRef.current = true;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();

    if (!text) {
      setSelectionInfo(null);
      onSelectRef.current?.(null);
      return;
    }

    // multi node selection feature not required as of now
    if (range.startContainer !== range.endContainer) {
      setSelectionInfo(null);
      onSelectRef.current?.(null);
      return;
    }

    let element =
      range.commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? range.commonAncestorContainer.parentElement
        : (range.commonAncestorContainer as HTMLElement);

    const blockElement = element?.closest<HTMLElement>("[data-block-start]");

    // Guard: if no block element found (e.g. list items without data-block-start),
    // still show the toolbar but skip block offset calculation
    const nodeStart = blockElement
      ? getNodeOffset(blockElement, range.startContainer)
      : 0;

    const absoluteStart = nodeStart + range.startOffset;
    const absoluteEnd = nodeStart + range.endOffset;

    const startOffset = Number(blockElement?.getAttribute("data-block-start") ?? 0);
    const endOffset = Number(blockElement?.getAttribute("data-block-end") ?? 0);

    const rect = range.getBoundingClientRect();

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
    onSelectRef.current?.(selectionData);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      // Don't clear selection while the mouse button is still held down —
      // avoids a race condition where selectionchange fires during/right after
      // mouseup before handleMouseUp has committed the new selection state.
      if (isMouseDownRef.current) return;

      const selection = window.getSelection();

      if (!selection?.toString().trim()) {
        setSelectionInfo(null);
        onSelectRef.current?.(null);
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
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={clsx(
          "prose prose-invert w-full prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 ",
          className,
          "relative",
        )}
        ref={containerRef}
      >
        <MarkdownRenderer {...markdownProps} />
        {selectionInfo &&
          typeof document !== "undefined" &&
          createPortal(toolBar, document.body)}
        <AnnotationLayer
          anchors={anchors}
          containerRef={containerRef}
          resizeContainerRef={resizeContainerRef}
        />
      </div>
    </SelectableMarkdownContext.Provider>
  );
};
