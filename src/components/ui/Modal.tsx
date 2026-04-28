"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ModalContextType = {
  open: boolean;
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Use inside Modal");
  return ctx;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  open: openProp,
  onClose,
  children,
  className,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (openProp) {
      setOpen(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      setClosing(true);

      setTimeout(() => {
        setOpen(false);
        setClosing(false);
        document.body.style.overflow = "auto";
      }, 200);
    }
  }, [openProp]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ open, onClose }}>
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          closing ? "opacity-0" : "opacity-100",
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            "w-full max-w-md rounded-xl shadow-xl border transform transition-all duration-200",
            "bg-(--color-card) border-white/10",
            closing
              ? "opacity-0 scale-95 translate-y-4"
              : "opacity-100 scale-100 translate-y-0",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}
