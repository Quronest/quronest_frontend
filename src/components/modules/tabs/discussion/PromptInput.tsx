import Button from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Send } from "lucide-react";

export const PromptInput = () => {
  return (
    <div className="border-t border-card-hover bg-background p-4">
      <div className="mx-auto flex max-w-4xl gap-3 bg-card-hover">

        <TextArea
          className="min-h-24 flex-1 resize-none"
          placeholder="Ask anything about this resource..."
        />

        <Button>
          <Send size={18} />
        </Button>

      </div>
    </div>
  );
};