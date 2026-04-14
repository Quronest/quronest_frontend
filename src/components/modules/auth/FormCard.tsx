import { Card } from "@/components/ui/Card";
import React from "react";

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <form
        className="w-full min-w-md mx-auto space-y-5 p-3 rounded-xl shadow flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </form>
    </Card>
  );
}

export default FormCard;
