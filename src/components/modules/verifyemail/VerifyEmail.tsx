"use client";

import { MailCheck } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function VerifyEmail() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-xl p-10 text-center border-border">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Your Email
        </h1>

        <p className="mt-4 text-base leading-7 text-neutral">
          We've sent a verification link to your email address.
          <br />
          Click the button below to verify your account and continue.
        </p>

        <Button className="mt-8 w-full">Verify Email</Button>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-neutral">Didn't receive the email?</p>

          <button
            type="button"
            className="mt-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Resend Email
          </button>
        </div>
      </Card>
    </main>
  );
}
