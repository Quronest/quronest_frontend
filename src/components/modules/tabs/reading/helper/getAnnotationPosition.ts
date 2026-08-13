import { SelectionAnchor } from "@/types/WorkspaceType";
import { buildRange } from "./buildRange";
import { TaskAnchor } from "@/types/TaskType";

export function getAnnotationPosition(
  anchor: TaskAnchor,
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
