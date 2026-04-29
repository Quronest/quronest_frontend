import Button from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MockWeekProgress = () => (
  <div className="flex items-center justify-between mx-auto max-w-4xl">
    <Button variant="nav" className="rounded-full! justify-center p-1!">
      <ChevronLeft />
    </Button>
    <div className="flex items-center justify-center gap-10 my-10">
      <CircularProgress value={58} showLabel label="19" size={35}/>
      <CircularProgress value={88} showLabel label="20" size={40}/>
      <CircularProgress value={28} showLabel label="21" size={45}/>
      <CircularProgress value={58} showLabel label="22" />
      <CircularProgress value={100} showLabel label="23" size={45}/>
      <CircularProgress value={28} showLabel label="24" size={40}/>
      <CircularProgress value={28} showLabel label="25" size={35}/>
    </div>
    <Button variant="nav" className="rounded-full! justify-center p-1!">
      <ChevronRight />
    </Button>
  </div>
);
