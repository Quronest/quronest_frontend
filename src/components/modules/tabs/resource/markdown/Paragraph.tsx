import { HighlightState } from "@/store/features/highlights/highlightSlice";
import clsx from "clsx";
import React from "react";
import { ExtraProps } from "react-markdown";

import { getBlockHighlights } from "../helper";
import { renderHighlightedText } from "../helper";

type ParagraphProps = React.ComponentPropsWithoutRef<"p"> &
  ExtraProps &
  HighlightState;

export const Paragraph = ({
  children,
  className,
  highlights,
  node,
  ...props
}: ParagraphProps) => {
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

  return (
    <p
      className={clsx("leading-7 text-foreground/90", className)}
      data-block-start={node?.position?.start?.offset}
      data-block-end={node?.position?.end?.offset}
      {...props}
    >
      {content}
    </p>
  );
};
