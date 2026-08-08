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
  anchor: SelectionAnchor,
  root: HTMLElement,
): Range | null {
  const block = root.querySelector<HTMLElement>(
    `[data-block-start="${anchor.blockOffset.start}"]`,
  );

  if (!block) return null;

  const start = findTextPosition(block, anchor.selectionOffset.start);
  const end = findTextPosition(block, anchor.selectionOffset.end);

  if (!start || !end) return null;

  const range = document.createRange();

  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);

  return range;
}
