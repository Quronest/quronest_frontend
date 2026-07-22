import { useEffect, useMemo, useState } from "react";
import AnnotationIcon from "./AnnotationIcon";
import { getAnnotationPosition } from "./helper/getAnnotationPosition";
import { SelectionAnchor } from "@/types/WorkspaceType";
import { AnchorTypes } from "@/enums/AnchorEnums";
import { useResponsiveContainer } from "@/components/ui/ResponsiveContainer";

type Props = {
  anchors: (SelectionAnchor | undefined)[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onAnnotationClick?: (id: string) => void;
};

type Position = {
  anchor: SelectionAnchor | undefined;
  position: {
    x: number;
    y: number;
  } | null;
};

export default function AnnotationLayer({
  anchors,
  containerRef,
  onAnnotationClick,
}: Props) {
  if (!anchors) return;
  if (!containerRef) return;
  const { width } = useResponsiveContainer();
  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    if (!containerRef.current) return;

    let positionList = anchors
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

  if (!positions) return;
  console.log("Anchors: ", anchors);
  return (
    <>
      {positions.map((item) => {
        const anchor = item!.anchor!;
        const key = `${anchor.type}-${anchor.blockOffset.start}-${anchor.selectionOffset.start}`;
        return (
          <AnnotationIcon
            key={key}
            type={anchor.type}
            x={item!.position!.x}
            y={item!.position!.y}
            onClick={() => console.log("annotation")}
          />
        );
      })}
    </>
  );
}
