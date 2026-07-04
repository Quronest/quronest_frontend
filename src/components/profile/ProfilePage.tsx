"use client";

import ProfileCard from "./ProfileCard";
import StatsSection from "./StatsSection";
import HeatMap from "./HeatMap";
import ActivityTimeline from "./ActivityTimeline";

import type { UserProfile } from "@/types/ProfileType";

interface ProfilePageProps {
  profile: UserProfile;
  selectedDate?: string;
}

const ProfilePage = ({
  profile,
  selectedDate = profile.activityTimeline[0]?.date ?? "",
}: ProfilePageProps) => {
  const currentYear = Number(
    profile.contributions[0]?.date.split("-")[0] ?? new Date().getFullYear(),
  );

  return (
    <section className="mx-auto w-full max-w-400 px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        {/* Left Sidebar */}
        <aside className="self-start">
          <ProfileCard profile={profile} />
        </aside>

        {/* Right Content */}
        <main className="flex min-w-0 flex-col gap-6">
          <StatsSection stats={profile.stats} />

          <HeatMap year={currentYear} contributions={profile.contributions} />

          <ActivityTimeline
            activities={profile.activityTimeline}
            selectedDate={selectedDate}
          />
        </main>
      </div>
    </section>
  );
};

export default ProfilePage;
