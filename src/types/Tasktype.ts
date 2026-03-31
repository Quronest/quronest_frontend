type TagType = {
  type: "neutral" | "secondary" | "primary" | "accent";
  label: string;
};

export type Tasktype = {
  id: string;
  title: string;
  progress: number;
  duration: number; // in seconds,
  tags: TagType[];
};
