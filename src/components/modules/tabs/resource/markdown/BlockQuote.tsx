import { HighlightState } from "@/store/features/highlights/highlightSlice";
import clsx from "clsx";
import React from "react";
import { ExtraProps } from "react-markdown";
import { getBlockHighlights } from "../helper/getBlockHighlights";
import { renderHighlightedText } from "../helper/renderHighlightedText";

type BlockQuoteProps = React.ComponentPropsWithoutRef<"blockquote"> &
  ExtraProps &
  HighlightState;

export const BlockQuote = ({
  children,
  className,
  node,
  highlights,
  ...props
}: BlockQuoteProps) => {
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
    <blockquote
      data-block-start={node?.position?.start?.offset}
      data-block-end={node?.position?.end?.offset}
      className={clsx(
        "border-l-4 border-primary pl-4 italic text-neutral",
        className,
      )}
      {...props}
    >
      {content}
    </blockquote>
  );
};
