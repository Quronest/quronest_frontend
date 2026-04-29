import clsx from "clsx";
import React from "react";

const CardActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center gap-1",
        "opacity-0 transition-all duration-200 ease-out",
        "group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-safe:translate-y-1",
      )}
    >
      {children}
    </div>
  );
};

export default CardActions;
