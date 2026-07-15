import { Card } from "@/components/ui/Card";

const GeneralSettings = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-foreground">General Settings</h1>

        <p className="mt-2 text-neutral">
          Manage your general application preferences.
        </p>
      </Card>
    </div>
  );
};

export default GeneralSettings;
