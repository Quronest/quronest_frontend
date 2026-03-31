import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";

type TextLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  className?: string;
};

function TextLink({ children, href, ...props }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={clsx("text-primary hover:text-primary/50", props.className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default TextLink;
