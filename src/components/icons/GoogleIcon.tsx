import { IconImageType } from "@/types/IconImageType";

export const GoogleIcon = ({ size = 24, ...props }: IconImageType) => {
  return (
    <img
      src="/google-icon-logo.svg"
      alt="google icon"
      style={{ height: `${size}px`, width: `${size}px` }}
      {...props}
    />
  );
};
