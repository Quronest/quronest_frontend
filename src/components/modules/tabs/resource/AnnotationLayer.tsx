import { useMemo } from "react";
import AnnotationIcon from "./AnnotationIcon";
import { getAnnotationPosition } from "./helper/getAnnotationPosition";
import { SelectionAnchor } from "@/types/WorkspaceType";
import { AnchorTypes } from "@/enums/AnchorEnums";

type Props = {
  anchors: (SelectionAnchor | undefined)[];
  containerRef: React.RefObject<HTMLDivElement> | null;
  onAnnotationClick: (id: string) => void;
};

export default function AnnotationLayer({
  anchors,
  containerRef,
  onAnnotationClick,
}: Props) {
  if (!anchors) return;
  if (!containerRef) return;
  const positions = useMemo(() => {
    if (!containerRef.current) return [];

    return anchors
      .map((anchor) => {
        const position = getAnnotationPosition(anchor!, containerRef.current!);

        if (!position) return null;

        return {
          anchor,
          position,
        };
      })
      .filter(Boolean);
  }, [anchors, containerRef]);

  if (!positions) return;

  return (
    <>
      {positions.map((item, index) => (
        <AnnotationIcon
          key={index}
          type={item!.anchor!.type}
          x={item!.position.x}
          y={item!.position.y}
          onClick={() => console.log("annotation")}
        />
      ))}
    </>
  );
}
