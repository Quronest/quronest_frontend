import { HighlightState } from "@/store/features/highlights/highlightSlice";
import clsx from "clsx";
import React from "react";
import { ExtraProps } from "react-markdown";
import { getBlockHighlights, renderHighlightedText } from "../helper";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3;
} & ExtraProps &
  HighlightState;

export const Heading = ({
  level,
  children,
  className,
  highlights,
  node,
  ...props
}: HeadingProps) => {
  const blockHighlights = getBlockHighlights(
    highlights,
    node?.position?.start?.offset,
    node?.position?.end?.offset,
  );

  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : "";

  const content =
    text && blockHighlights.length > 0
      ? renderHighlightedText(text, blockHighlights)
      : children;

  const headingText = React.Children.toArray(children).join("");

  const id = headingText.toString().toLowerCase().replace(/\s+/g, "-");

  if (level === 1) {
    return (
      <h1
        id={id}
        data-block-start={node?.position?.start?.offset}
        data-block-end={node?.position?.end?.offset}
        className={clsx(
          "scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {content}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        id={id}
        data-block-start={node?.position?.start?.offset}
        data-block-end={node?.position?.end?.offset}
        className={clsx(
          "scroll-m-20 mt-10 border-b border-card-hover pb-2 text-2xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {content}
      </h2>
    );
  }

  return (
    <h3
      id={id}
      data-block-start={node?.position?.start?.offset}
      data-block-end={node?.position?.end?.offset}
      className={clsx("scroll-m-20 mt-8 text-xl font-semibold", className)}
      {...props}
    >
      {content}
    </h3>
  );
};
