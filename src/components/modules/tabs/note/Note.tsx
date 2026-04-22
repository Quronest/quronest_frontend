import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { type NoteType } from "@/types/NoteType";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Note = ({ note }: { note: NoteType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative group p-2 py-4 rounded-sm bg-card space-y-2">
      {/* text reference */}
      <p className="text-neutral text-xs line-clamp-1 max-w-[80%] w-full mb-2">
        {note.selectedText}
      </p>
      {/* actual content */}
      <p className="text-sm text-foreground whitespace-pre-wrap">
        {note.content}
      </p>

      {/* more option button */}
      <Button
        variant="icon"
        className={clsx(
          "absolute top-2 right-2 hidden",
          "group-hover:block",
          isMenuOpen && "block!",
        )}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Menu size={16} />
      </Button>

      {/* menuBox */}
      {isMenuOpen && (
        <Card
          border="primary"
          className="absolute z-100 top-12 right-2 p-1! rounded-sm bg-card-hover space-y-1"
        >
          <Button variant="list" className="hover:bg-background!">
            Edit
          </Button>
          <Button variant="list" className="hover:bg-background!">
            Delete
          </Button>
        </Card>
      )}
    </div>
  );
};
