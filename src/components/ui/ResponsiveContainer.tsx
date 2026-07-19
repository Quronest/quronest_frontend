import { createContext, useContext, useEffect, useRef, useState } from "react";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = "base" | keyof typeof breakpoints;

type ResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
};
type ResponsiveContainerContextType = {
  width: number;
  breakpoint: Breakpoint;
};
const ResponsiveContainerContext = createContext<
  ResponsiveContainerContextType | undefined
>(undefined);

export const useResponsiveContainer = () => {
  const data = useContext(ResponsiveContainerContext);
  if (!data) {
    throw new Error(
      "useResponsiveContainer must be used inside ResponsiveContainer",
    );
  }
  return data;
};

export const ResponsiveContainer = ({
  children,
  className,
}: ResponsiveContainerProps) => {
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
    <ResponsiveContainerContext.Provider value={{ width, breakpoint }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ResponsiveContainerContext.Provider>
  );
};
