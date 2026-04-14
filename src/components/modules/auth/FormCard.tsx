import { Card } from "@/components/ui/Card";
import React from "react";

function FormCard({
  children,
  onSubmit = (e) => {
    e.preventDefault();
  },
}: {
  children: React.ReactNode;
  onSubmit?: (e: any) => void;
}) {
  return (
    <Card>
      <form
        className="w-full min-w-md max-w-lg mx-auto space-y-5 p-3 rounded-xl shadow flex flex-col"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Card>
  );
}

export default FormCard;
