"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <header className="mb-2 flex items-start gap-5">
      <Button
        type="button"
        variant="icon"
        className="mt-1 rounded-full"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </Button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Edit Profile
        </h1>
      </div>
    </header>
  );
}