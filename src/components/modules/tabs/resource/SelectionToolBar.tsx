import Button from "@/components/ui/Button";
import { TextSelection } from "@/types/WorkspaceType";

export type SelectionToolBarProps = {
  selection: TextSelection | null;
  onHighlight?: (selection: TextSelection | null) => void;
  onAddNote?: (selection: TextSelection | null) => void;
  onAskDoubt?: (selection: TextSelection | null) => void;
};

export const SelectionToolBar = ({
  selection,
  onHighlight,
  onAddNote,
  onAskDoubt,
}: SelectionToolBarProps) => {
  if (!selection) {
    return null;
  }

  return (
    <div
      className="fixed z-50 bg-card border border-primary p-2 rounded-lg flex items-center gap-2 text-sm -translate-x-1/2 "
      style={{
        left: Math.max(235, selection.position.x),
        top: selection.position.y - 50,
      }}
    >
      {onHighlight && (
        <Button
          variant="list"
          onClick={() => onHighlight(selection)}
          className="flex-1"
        >
          Highlight
        </Button>
      )}
      {onAddNote && (
        <Button
          variant="list"
          onClick={() => onAddNote(selection)}
          className="flex-1 whitespace-nowrap"
        >
          Add Note
        </Button>
      )}
      {onAskDoubt && (
        <Button
          variant="list"
          onClick={() => onAskDoubt(selection)}
          className="flex-1 whitespace-nowrap"
        >
          Ask Doubt
        </Button>
      )}
    </div>
  );
};
