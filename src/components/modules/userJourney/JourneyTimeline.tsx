"use client";

import TimelineCard from "./TimelineCard";

const timeline = [
  {
    id: 1,
    title: "Joined Program",
    description: "Successfully enrolled in the Full Stack Development program.",
    date: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "Frontend Module Completed",
    description: "Completed HTML, CSS, Tailwind CSS and React fundamentals.",
    date: "Feb 20, 2025",
  },
  {
    id: 3,
    title: "Portfolio Project Submitted",
    description: "Built and submitted a personal portfolio for mentor review.",
    date: "Mar 18, 2025",
  },
  {
    id: 4,
    title: "Mock Interview",
    description: "Participated in a technical mock interview with feedback.",
    date: "Apr 12, 2025",
  },
  {
    id: 5,
    title: "Internship Started",
    description:
      "Started working on a real-world project with the engineering team.",
    date: "May 01, 2025",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="mt-20">
      <div className="mb-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Timeline
        </p>

        <h2 className="mt-3 text-2xl font-bold text-foreground">
          Milestones & Events
        </h2>

        <p className="mt-3 max-w-2xl text-neutral">
          Explore every milestone, achievement and learning activity throughout
          the user's journey.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 rounded-full bg-border lg:block" />

        <div className="flex flex-col gap-14">
          {timeline.map((item, index) => (
            <TimelineCard
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
