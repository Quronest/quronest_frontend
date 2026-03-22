import clsx from "clsx";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";

type ButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, "type"> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "nav";
  className?: string;
  type?: "button" | "submit" | "reset";
  id?: string;
  size?: "sm" | "md" | "lg";
};

const sizes: Record<string, ClassValue> = {
  sm: "px-4 py-2 rounded-lg",
  md: "px-8 py-4 rounded-xl",
  lg: "px-10 py-6 rounded-2xl",
};

const variants: Record<string, ClassValue> = {
  primary: "text-white bg-primary font-bold ",
  outline: "bg-card-hover !border-primary ",
  nav: `bg-card w-14 h-14 p-1 text-primary flex flex-col! gap-1 justify-center 
  active:translate-y-0.5! hover:bg-card-hover rounded-full! `,
};

const Button = ({
  id,
  type,
  className,
  children,
  size = "sm",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      className={clsx(
        "flex items-center cursor-pointer ",
        `transition-all duration-400 hover:brightness-110 active:translate-y-1 active:brightness-80 
        disabled:brightness-75 disabled:cursor-not-allowed `,
        "border-transparent border",
        className,
        variants[variant],
        sizes[size],
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
