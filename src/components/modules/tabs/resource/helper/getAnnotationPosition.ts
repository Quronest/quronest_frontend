import { SelectionAnchor } from "@/types/WorkspaceType";
import { buildRange } from "./buildRange";

export function getAnnotationPosition(
  anchor: SelectionAnchor,
  root: HTMLElement,
) {
  const range = buildRange(anchor, root);

  if (!range) return null;

  const rect = range.getBoundingClientRect();

  return {
    x: rect.right,
    y: rect.top + rect.height / 2,
  };
}
