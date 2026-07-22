"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

import type { Contribution } from "@/types/ProfileType";

const WEEKS = 53;
const DAYS = 7;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const colors = [
  "bg-background",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

const yearOptions = [2026, 2025, 2024, 2023].map((year) => ({
  label: String(year),
  value: String(year),
}));

interface ActivitySectionProps {
  year: number;
  contributions: Contribution[];
}

const getLevel = (count: number) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
};

const generateHeatmap = (year: number, contributions: Contribution[]) => {
  const contributionMap = new Map(
    contributions.map((item) => [item.date, item.count]),
  );

  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));

  return Array.from({ length: WEEKS }, (_, week) =>
    Array.from({ length: DAYS }, (_, day) => {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);

      const dateString = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const count =
        date.getFullYear() === year
          ? (contributionMap.get(dateString) ?? 0)
          : 0;

      return {
        date: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        count,
        level: getLevel(count),
      };
    }),
  );
};

const getMonthPositions = () =>
  months.map((month, index) => ({
    month,
    column: Math.floor((index * WEEKS) / 12),
  }));

const HeatMap = ({ year, contributions }: ActivitySectionProps) => {
  const [selectedYear, setSelectedYear] = useState(year);

  const filteredContributions = useMemo(
    () =>
      contributions.filter((item) =>
        item.date.startsWith(String(selectedYear)),
      ),
    [contributions, selectedYear],
  );

  const heatmap = useMemo(
    () => generateHeatmap(selectedYear, filteredContributions),
    [selectedYear, filteredContributions],
  );

  const totalContributions = filteredContributions.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const monthPositions = getMonthPositions();

  return (
    <Card className="border border-border p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Contribution Activity</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {totalContributions} contributions in {selectedYear}
          </p>
        </div>

        <Select
          value={String(selectedYear)}
          options={yearOptions}
          onChange={(value) => setSelectedYear(Number(value))}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-205">
          <div
            className="mb-2 ml-8 grid text-xs text-muted-foreground"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
            }}
          >
            {monthPositions.map(({ month, column }) => (
              <span
                key={month}
                style={{ gridColumnStart: column + 1 }}
                className="whitespace-nowrap"
              >
                {month}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="grid h-24.5 grid-rows-7 text-xs text-muted-foreground">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div
              className="grid grid-flow-col grid-rows-7 gap-1"
              style={{
                gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
              }}
            >
              {heatmap.flat().map((cell, index) => (
                <div
                  key={index}
                  title={`${cell.count} contributions on ${cell.date}`}
                  className={`h-3 w-3 rounded-sm transition-all hover:scale-110 ${colors[cell.level]}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>

              {colors.map((color) => (
                <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
              ))}

              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeatMap;
