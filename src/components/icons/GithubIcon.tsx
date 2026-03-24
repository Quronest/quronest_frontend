import { IconImageType } from "@/types/IconImageType";

export const GithubIcon = ({ size = 26, ...props }: IconImageType) => {
  return (
    <img
      src="/github-icon-logo.svg"
      alt="github icon"
      style={{ height: `${size}px`, width: `${size}px` }}
      {...props}
    />
  );
};
