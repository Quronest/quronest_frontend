import clsx from "clsx";

type NoteCardProps = React.ComponentPropsWithoutRef<"article"> & {
  children: React.ReactNode;
};
export const NoteCard = ({ children, className, ...props }: NoteCardProps) => {
  return (
    <article
      className={clsx(
        "group relative overflow-hidden p-3 rounded-2xl border border-card-hover/70 bg-card/70",
        "shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_20px_45px_rgba(0,0,0,0.24)]",
        "focus-within:-translate-y-0.5 focus-within:border-primary/55",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
};
