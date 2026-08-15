import { useEffect, useState } from "react";
import AnnotationIcon from "./AnnotationIcon";
import { getAnnotationPosition } from "./helper/getAnnotationPosition";
import { SelectionAnchor } from "@/types/WorkspaceType";
import { TaskAnchor } from "@/types/TaskType";

type Props = {
  anchors: TaskAnchor[] | [];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onAnnotationClick?: (id: string) => void;
  resizeContainerRef?: React.RefObject<HTMLElement | Window | null>;
};

type Position = {
  anchor: TaskAnchor | undefined;
  position: {
    x: number;
    y: number;
  } | null;
};

export default function AnnotationLayer({
  anchors,
  containerRef,
  onAnnotationClick,
  resizeContainerRef,
}: Props) {
  if (!anchors) return null;
  if (!containerRef) return null;

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const target = resizeContainerRef?.current || (typeof window !== "undefined" ? window : null);
    if (!target) return;

    if (target === window) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } else {
      const element = target as HTMLElement;
      const observer = new ResizeObserver(([entry]) => {
        setWidth(entry.contentRect.width);
      });
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [resizeContainerRef]);

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const positionList = anchors
      .map((anchor) => {
        const position = getAnnotationPosition(anchor!, containerRef.current!);

        if (!position) return null;

        return {
          anchor,
          position,
        };
      })
      .filter(Boolean);

    setPositions(positionList as Position[]);
  }, [anchors, containerRef, width]);

  if (!positions) return null;
  return (
    <>
      {positions.map((item) => {
        const anchor = item!.anchor!;
        const key = `${anchor.type}-${anchor.block_offset.start}-${anchor.selection_offset.start}`;
        return (
          <AnnotationIcon
            key={key}
            type={anchor.type}
            x={item!.position!.x}
            y={item!.position!.y}
            onClick={() => onAnnotationClick?.(anchor.reference_id)}
          />
        );
      })}
    </>
  );
}

