import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import ModalHeader from "@/components/ui/ModalHeader";

type TestSubmissionModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  stats: {
    answered: number;
    left: number;
  };
  disabled: boolean;
};

export const TestSubmissionModal = ({
  open,
  onClose,
  onSubmit,
  stats,
  disabled,
}: TestSubmissionModalProps) => {
  return (
    <Modal open={open} onClose={onClose} className="p-6 max-w-md bg-card">
      <ModalHeader
        title="Submit Test"
        subtitle=" Are you sure you want to submit your test?"
      />
      <div className="space-y-6">
        <div className="space-y-4 text-foreground/80">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Answered Box */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-4 w-4 text-emerald-400 mb-1" />
              <span className="text-xl font-bold text-emerald-400">
                {stats.answered}
              </span>
              <span className="text-[10px] text-neutral uppercase font-semibold">
                Answered
              </span>
            </div>

            {/* Left Box */}
            <div className="bg-white/5 border border-border p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <HelpCircle className="h-4 w-4 text-neutral mb-1" />
              <span className="text-xl font-bold text-neutral">
                {stats.left}
              </span>
              <span className="text-[10px] text-neutral uppercase font-semibold">
                Remaining
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-border">
          <Button
            variant="primary"
            onClick={onSubmit}
            className="rounded-lg px-5 py-2 font-semibold shadow-lg bg-primary hover:brightness-110 w-full"
            disabled={disabled}
          >
            Submit Test
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default TestSubmissionModal;
