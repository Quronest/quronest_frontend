"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  XCircle,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmail() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStatus("loading");

    // Demo only. Replace with your API later.
    const timer = setTimeout(() => {
      const success = false; // Change to false to preview error state

      if (success) {
        setStatus("success");
        setMessage("Your email address has been successfully verified!");
      } else {
        setStatus("error");
        setMessage(
          "Verification failed. The token may be invalid or has expired.",
        );
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="mx-auto w-full max-w-md border-border p-8 text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center py-6">
            <div className="relative mb-6 flex items-center justify-center">
              <LoaderCircle className="h-16 w-16 animate-spin text-primary/30" />
              <Mail className="absolute h-6 w-6 text-primary" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Verifying Email
            </h2>

            <p className="max-w-sm text-neutral">
              Please wait while we confirm your email verification details...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 rounded-full bg-green-500/10 p-4">
              <CheckCircle2 className="h-14 w-14 text-green-500" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Verification Complete
            </h2>

            <p className="mb-3 font-medium text-primary">{message}</p>

            <p className="mb-8 max-w-sm text-neutral">
              Your account is now fully active. You can continue to your
              profile.
            </p>

            <Link href="/profile" className="w-full">
              <Button className="flex w-full items-center justify-center gap-2">
                Go to Profile
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-6">
            <div className="mb-6 rounded-full bg-red-500/10 p-4">
              <XCircle className="h-14 w-14 text-red-500" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Verification Failed
            </h2>

            <p className="mb-3 font-medium text-primary">{message}</p>

            <p className="mb-8 max-w-sm text-neutral">
              Make sure you copied the full link or request a new verification
              email.
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go to Home
                </Button>
              </Link>

              <Link href="/auth/login" className="flex-1">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
