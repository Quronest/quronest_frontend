export function getNodeOffset(block: HTMLElement, targetNode: Node) {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);

  let offset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (node === targetNode) {
      return offset;
    }

    offset += node.textContent?.length ?? 0;
  }

  return -1;
}
