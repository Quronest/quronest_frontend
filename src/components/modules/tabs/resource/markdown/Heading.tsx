import clsx from "clsx";
import React from "react";

type H1Props = React.ComponentPropsWithoutRef<"h1">;

export const H1 = ({
  children,
  className,
  ...props
}: H1Props) => {
  return (
    <h1
      className={clsx(
        "scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};