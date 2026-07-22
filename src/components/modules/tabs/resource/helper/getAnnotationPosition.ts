import { SelectionAnchor } from "@/types/WorkspaceType";
import { buildRange } from "./buildRange";

export function getAnnotationPosition(
  anchor: SelectionAnchor,
  root: HTMLElement,
) {
  const range = buildRange(anchor, root);

  if (!range) return null;

  const rect = range.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();

  return {
    x: rect.right - rootRect.left,
    y: rect.top - rootRect.top,
  };
}
