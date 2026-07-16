import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

type TestSubmissionModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  stats: {
    answered: number;
    flagged: number;
    left: number;
  };
};

export const TestSubmissionModal = ({
  open,
  onClose,
  onSubmit,
  stats,
}: TestSubmissionModalProps) => {
  return (
    <Modal open={open} onClose={onClose} className="p-6 max-w-md bg-card">
      <div className="space-y-6">
        {/* Warning Header */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
          <h2 className="text-xl font-bold text-foreground">Submit Test?</h2>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-foreground/80">
          <p className="text-sm leading-relaxed">
            Are you sure you want to submit your test? Once submitted, your answers will be graded
            and you will no longer be able to make changes.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {/* Answered Box */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mb-1" />
              <span className="text-xl font-bold text-emerald-400">{stats.answered}</span>
              <span className="text-[10px] text-neutral uppercase font-semibold">Answered</span>
            </div>

            {/* Flagged Box */}
            <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <AlertTriangle className="h-4 w-4 text-amber-400 mb-1" />
              <span className="text-xl font-bold text-amber-400">{stats.flagged}</span>
              <span className="text-[10px] text-neutral uppercase font-semibold">Flagged</span>
            </div>

            {/* Left Box */}
            <div className="bg-white/5 border border-border p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <HelpCircle className="h-4 w-4 text-neutral mb-1" />
              <span className="text-xl font-bold text-neutral">{stats.left}</span>
              <span className="text-[10px] text-neutral uppercase font-semibold">Remaining</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-neutral hover:text-foreground font-semibold px-4 py-2 border border-border hover:bg-card-hover"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            className="rounded-lg px-5 py-2 font-semibold shadow-lg bg-primary hover:brightness-110"
          >
            Submit Test
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default TestSubmissionModal;
