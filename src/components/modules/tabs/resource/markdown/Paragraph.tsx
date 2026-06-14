import clsx from "clsx";
import React from "react";

type ParagraphProps = React.ComponentPropsWithoutRef<"p">;

export const Paragraph = ({
  children,
  className,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={clsx(
        "leading-7 text-foreground/90",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};