"use client";

import ProfileCard from "./ProfileCard";
import StatsSection from "./StatsSection";
import HeatMap from "./HeatMap";
import ActivityTimeline from "./ActivityTimeline";

import { useGetProfileQuery } from "@/store/features/user/userApi";

export default function ProfilePage() {
  const { data: profile } = useGetProfileQuery();

  if (!profile) return null;

  return (
    <section className="mx-auto w-full max-w-400 px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="self-start">
          <ProfileCard profile={profile} />
        </aside>

        <main className="flex min-w-0 flex-col gap-6">
          <StatsSection currentSummary={profile.current_summary} />

          <HeatMap year={new Date().getFullYear()} contributions={[]} />

          <ActivityTimeline activities={[]} selectedDate="" />
        </main>
      </div>
    </section>
  );
}
