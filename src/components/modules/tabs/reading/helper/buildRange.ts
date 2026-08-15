import { TaskAnchor } from "@/types/TaskType";
import { SelectionAnchor } from "@/types/WorkspaceType";

type TextPosition = {
  node: Text;
  offset: number;
};

function findTextPosition(
  block: HTMLElement,
  targetOffset: number,
): TextPosition | null {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);

  let currentOffset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const length = node.textContent?.length ?? 0;

    if (currentOffset + length >= targetOffset) {
      return {
        node,
        offset: targetOffset - currentOffset,
      };
    }

    currentOffset += length;
  }

  return null;
}

export function buildRange(
  anchor: TaskAnchor,
  root: HTMLElement,
): Range | null {
  if (!anchor.block_offset) return null;
  const block = root.querySelector<HTMLElement>(
    `[data-block-start="${anchor.block_offset.start}"]`,
  );

  if (!block) return null;
  if (!anchor.selection_offset) return null;
  const start = findTextPosition(block, anchor.selection_offset.start);
  const end = findTextPosition(block, anchor.selection_offset.end);

  if (!start || !end) return null;

  const range = document.createRange();

  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);

  return range;
}
