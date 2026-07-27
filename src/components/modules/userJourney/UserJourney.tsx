"use client";

import JourneyHeader from "./JourneyHeader";
import JourneyOverview from "./JourneyOverview";
import JourneyTimeline from "./JourneyTimeline";

export default function UserJourney() {
  return (
    <section className="mx-auto w-full max-w-400 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <JourneyHeader />

        <JourneyOverview />

        <JourneyTimeline />
      </div>
    </section>
  );
}
