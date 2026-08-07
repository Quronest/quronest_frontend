import { createContext, useContext, useEffect, useRef, useState } from "react";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = "base" | keyof typeof breakpoints;

type TabResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
};
type TabResponsiveContainerContextType = {
  width: number;
  breakpoint: Breakpoint;
};
const TabResponsiveContainerContext = createContext<
  TabResponsiveContainerContextType | undefined
>(undefined);

export const useTabResponsiveContainer = () => {
  const data = useContext(TabResponsiveContainerContext);
  if (!data) {
    throw new Error(
      "useTabResponsiveContainer must be used inside TabResponsiveContainer",
    );
  }
  return data;
};

export const TabResponsiveContainer = ({
  children,
  className,
}: TabResponsiveContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const breakpoint: Breakpoint =
    width >= breakpoints.xl
      ? "xl"
      : width >= breakpoints.lg
        ? "lg"
        : width >= breakpoints.md
          ? "md"
          : width >= breakpoints.sm
            ? "sm"
            : "base";

  return (
    <TabResponsiveContainerContext.Provider value={{ width, breakpoint }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </TabResponsiveContainerContext.Provider>
  );
};
