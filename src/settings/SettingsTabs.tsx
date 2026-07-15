import Tabs, { TabItem } from "@/components/ui/Tabs";

const settingsTabs: TabItem[] = [
  {
    label: "General",
    href: "/settings/general",
  },
  {
    label: "Profile",
    href: "/settings/profile",
  },
  {
    label: "Context",
    href: "/settings/context",
  },
];

const SettingsTabs = () => {
  return (
    <div className="shrink-0 px-6">
      <Tabs items={settingsTabs} className="mx-auto max-w-5xl" />
    </div>
  );
};

export default SettingsTabs;
