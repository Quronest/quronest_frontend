import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

export const StartJourney = () => {
  const router = useRouter();
  return (
    <div>
      Welcome to start journey!!
      <Button onClick={() => router.push("/home")}>Go To Home</Button>
    </div>
  );
};
