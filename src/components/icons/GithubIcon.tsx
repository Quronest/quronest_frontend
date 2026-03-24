import { IconImageType } from "@/types/IconImageType";

<<<<<<< HEAD
export const GithubIcon = ({ size = 24, ...props }: IconImageType) => {
=======
export const GithubIcon = ({ size = 26, ...props }: IconImageType) => {
>>>>>>> bc212d1 (Login and Sign Up page created)
  return (
    <img
      src="/github-icon-logo.svg"
      alt="github icon"
      style={{ height: `${size}px`, width: `${size}px` }}
      {...props}
    />
  );
};
