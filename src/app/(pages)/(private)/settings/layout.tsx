import ScrollablePageContainer from "@/components/ui/ScrollablePageContainer";
import SettingsTabs from "@/settings/SettingsTabs";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollablePageContainer>
      <div className="sticky top-0 z-30 bg-background">
        <SettingsTabs />
      </div>

      {children}
    </ScrollablePageContainer>
  );
}
