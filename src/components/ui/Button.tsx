"use client";
import clsx from "clsx";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { PlacesType, Tooltip } from "react-tooltip";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "nav" | "list" | "icon" | "editIcon" | "deleteIcon";
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
  tooltipId?: string;
  tooltip?: string;
  tooltipPlace?: PlacesType;
  hover?: boolean;
  active?: boolean;
}

const sizes: Record<string, ClassValue> = {
  sm: "px-4 py-2 ",
  md: "px-8 py-4 ",
  lg: "px-10 py-6 ",
};

const variants: Record<string, ClassValue> = {
  primary: "text-white bg-primary font-bold justify-center",
  outline: "bg-card-hover !border-primary justify-center",
  nav: `bg-card w-12 h-12 p-2! text-neutral active:translate-y-0.5! hover:bg-card-hover justify-center`,
  list: `hover:bg-card-hover rounded-none! w-full text-left! text-sm py-1!`,
  icon: `bg-card w-fit h-fit p-2! text-neutral active:translate-y-0.5! hover:bg-card-hover justify-center`,
  editIcon: `bg-card w-fit h-fit p-2! text-neutral active:translate-y-0.5! hover:bg-card-hover justify-center rounded-full! border border-primary/20 bg-background/60 text-primary!`,
  deleteIcon: `bg-card w-fit h-fit p-2! text-neutral active:translate-y-0.5! hover:bg-card-hover justify-center rounded-full! border border-red-400/15 bg-background/60 text-red-300!`,
};

const Button = ({
  id,
  className,
  children,
  size = "sm",
  variant = "primary",
  tooltip,
  tooltipId = "button-tooltip",
  tooltipPlace = "bottom",
  hover = true,
  active = true,
  ...props
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "flex items-center cursor-pointer ",
        `transition-all duration-400 disabled:brightness-75 disabled:cursor-not-allowed `,
        "border-transparent border rounded-lg",
        hover && "hover:brightness-110",
        active && "active:translate-y-1 active:brightness-80 ",
        className,
        variants[variant],
        sizes[size],
      )}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltip}
      data-tooltip-place={tooltipPlace}
      {...props}
    >
      {children}

      {typeof document !== undefined &&
        createPortal(
          <Tooltip
            id={tooltipId}
            place={tooltipPlace}
            delayShow={500}
            style={{ zIndex: 9999 }}
          />,
          document.body,
        )}
    </button>
  );
};

export default Button;
