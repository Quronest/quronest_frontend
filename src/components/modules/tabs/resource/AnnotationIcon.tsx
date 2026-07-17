import { AnchorTypes } from "@/enums/AnchorEnums";
import { MessageSquare, CircleHelp } from "lucide-react";

type Props = {
  type: AnchorTypes;
  x: number;
  y: number;
  onClick: () => void;
};

const iconMap: any = {
  [AnchorTypes.DOUBT]: <CircleHelp />,
  [AnchorTypes.NOTE]: <MessageSquare />,
};

export default function AnnotationIcon({ type, x, y, onClick }: Props) {
  const icon = iconMap[type];
  if (!icon) return;
  return (
    <button
      className="absolute z-40 rounded-full bg-card border border-card-hover p-1 shadow hover:bg-card-hover transition"
      style={{
        left: x ,
        top: y,
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      {iconMap[type]}
    </button>
  );
}
