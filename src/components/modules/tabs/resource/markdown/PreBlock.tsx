import Button from "@/components/ui/Button";
import { Copy } from "lucide-react";
import React from "react";

type PreBlockProps = React.ComponentPropsWithoutRef<"pre">;

export const PreBlock = ({ children, ...props }: PreBlockProps) => {
  const [copied, setCopied] = React.useState(false);

  const preRef = React.useRef<HTMLPreElement>(null);

  const codeElement = children as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  const className = codeElement?.props?.className ?? "";

  const language =
    className
      .split(" ")
      .find((cls: string) => cls.startsWith("language-"))
      ?.replace("language-", "")
      .toUpperCase() ?? "TEXT";

  const handleCopy = async () => {
    const text = preRef.current?.innerText;

    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  return (
    <div className="my-4 overflow-hidden rounded-xl border border-card-hover bg-card">
      <div className="flex items-center justify-between border-b border-card-hover px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral">
          {language}
        </span>

        <Button
          variant="nav"
          className="h-fit! w-fit! px-2! py-1! text-xs"
          onClick={handleCopy}
        >
          {copied ? "Copied" : <Copy size={14} />}
        </Button>
      </div>

      <pre ref={preRef} className="m-0 overflow-x-auto p-0" {...props}>
        {children}
      </pre>
    </div>
  );
};
