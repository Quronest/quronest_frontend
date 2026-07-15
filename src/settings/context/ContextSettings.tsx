import { Card } from "@/components/ui/Card";

const ContextSettings = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-foreground">Context Settings</h1>

        <p className="mt-2 text-neutral">
          Manage the context used to personalize your experience.
        </p>
      </Card>
    </div>
  );
};

export default ContextSettings;
