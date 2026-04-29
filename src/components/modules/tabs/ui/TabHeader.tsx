import React from "react";

type TabHeaderProps = {
  title: string;
  subtitle: string;
};

export const TabHeader = ({ title, subtitle }: TabHeaderProps) => {
  return (
    <div className=" items-start space-y-2 border-b border-card-hover/80 px-6 py-5">
      <p className="text-xl font-semibold uppercase tracking-[0.28em] text-primary/80">
        {title}
      </p>
      <h2 className="text-md font-semibold text-neutral">
        {subtitle}
      </h2>
    </div>
  );
};
