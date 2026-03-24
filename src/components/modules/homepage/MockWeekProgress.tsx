import { CircularProgress } from "@/components/ui/CircularProgress";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const MockWeekProgress = () => (
  <div className="flex items-center justify-between mx-auto max-w-4xl">
    <div>
      <ArrowLeft />
    </div>
    <div className="flex items-center justify-center gap-10 my-10">
      <CircularProgress value={58} showLabel label="19" />
      <CircularProgress value={88} showLabel label="20" />
      <CircularProgress value={28} showLabel label="21" />
      <CircularProgress value={58} showLabel label="22" />
      <CircularProgress value={100} showLabel label="23" />
      <CircularProgress value={28} showLabel label="24" />
      <CircularProgress value={28} showLabel label="25" />
    </div>
    <div>
      <ArrowRight />
    </div>
  </div>
);