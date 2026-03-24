import { IconImageType } from "@/types/IconImageType";

<<<<<<< HEAD
export const GoogleIcon = ({ size = 24, ...props }: IconImageType) => {
=======
export const GoogleIcon = ({ size = 20, ...props }: IconImageType) => {
>>>>>>> bc212d1 (Login and Sign Up page created)
  return (
    <img
      src="/google-icon-logo.svg"
      alt="google icon"
      style={{ height: `${size}px`, width: `${size}px` }}
      {...props}
    />
  );
};
