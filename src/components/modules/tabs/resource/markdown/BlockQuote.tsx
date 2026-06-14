import clsx from "clsx";
import React from "react";

type BlockQuoteProps =
  React.ComponentPropsWithoutRef<"blockquote">;

export const BlockQuote = ({
  children,
  className,
  ...props
}: BlockQuoteProps) => {
  return (
    <blockquote
      className={clsx(
        "border-l-4 border-primary pl-4 italic text-neutral",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
};