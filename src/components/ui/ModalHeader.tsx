"use client";

import { X } from "lucide-react";
import { useModal } from "./Modal";
import Button from "./Button";

type Props = {
  title: string;
  subtitle?: string;
};

export default function ModalHeader({ title, subtitle }: Props) {
  const { onClose } = useModal();

  return (
    <div className="flex items-start justify-between px-4 py-3 border-b border-(--color-card-hover)">
      <div>
        {title && (
          <h2 className="text-lg font-semibold text-(--color-foreground)">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-sm text-(--color-neutral)">{subtitle}</p>
        )}
      </div>

      <Button
        onClick={onClose}
        className="p-1 rounded-md hover:bg-(--color-card-hover) transition"
      >
        <X size={18} />
      </Button>
    </div>
  );
}
