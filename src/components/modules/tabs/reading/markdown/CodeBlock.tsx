import clsx from "clsx";
import React from "react";

type CodeBlockProps = React.ComponentPropsWithoutRef<"code">;

export const CodeBlock = ({
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const isBlockCode = className?.includes("language-");

  if (!isBlockCode) {
    return (
      <code
        className={clsx(
          "rounded bg-card-hover px-1.5 py-0.5 text-primary",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code
      className={clsx(
        "block overflow-x-auto rounded-xl bg-background p-4 text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
};
