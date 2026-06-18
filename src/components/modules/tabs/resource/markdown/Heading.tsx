import clsx from "clsx";
import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3;
};

export const Heading = ({
  level,
  children,
  className,
  ...props
}: HeadingProps) => {
  const headingText = React.Children.toArray(children).join("");

  const id = headingText.toString().toLowerCase().replace(/\s+/g, "-");

  if (level === 1) {
    return (
      <h1
        id={id}
        className={clsx(
          "scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        id={id}
        className={clsx(
          "scroll-m-20 mt-10 border-b border-card-hover pb-2 text-2xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }

  return (
    <h3
      id={id}
      className={clsx("scroll-m-20 mt-8 text-xl font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
};
