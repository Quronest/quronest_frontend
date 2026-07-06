"use client";

import { useMemo } from "react";
import clsx from "clsx";

interface AvatarProps {
  src?: string | null;
  alt: string;
  name: string;

  size?: "sm" | "md" | "lg" | "xl";

  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
  xl: "h-32 w-32 text-4xl",
};

const Avatar = ({ src, alt, name, size = "md", className }: AvatarProps) => {
  const initials = useMemo(() => {
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx(
          "rounded-full object-cover border border-border",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-full bg-primary/10 font-bold text-primary border border-border",
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
};

export default Avatar;
