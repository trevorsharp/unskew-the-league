"use client";

import clsx from "clsx";
import type { InterConferenceStats } from "~/getSeasonData";

type interConferenceStatsTableProps = {
  interConferenceStats: InterConferenceStats;
};

const interConferenceStatsTable = ({
  interConferenceStats,
}: interConferenceStatsTableProps) => {
  const stats = [
    {
      name: "Inter-Conference Games Played",
      stat: interConferenceStats.gamesPlayed,
    },
    {
      name: "Eastern Conference Wins",
      stat: interConferenceStats.East.wins,
    },
    {
      name: "Western Conference Wins",
      stat: interConferenceStats.West.wins,
    },
  ];

  const statsLower = [
    {
      name: "Stronger Conference",
      stat:
        interConferenceStats.East.wins > interConferenceStats.West.wins
          ? "East"
          : interConferenceStats.West.wins > interConferenceStats.East.wins
            ? "West"
            : "-",
    },
    {
      name: "Eastern Conference Win Value",
      stat: interConferenceStats.East.winValue.toFixed(2),
      className:
        interConferenceStats.East.winValue > 1
          ? "text-green-600"
          : interConferenceStats.East.winValue < 1
            ? "text-red-600"
            : "",
    },
    {
      name: "Western Conference Win Value",
      stat: interConferenceStats.West.winValue.toFixed(2),
      className:
        interConferenceStats.West.winValue > 1
          ? "text-green-600"
          : interConferenceStats.West.winValue < 1
            ? "text-red-600"
            : "",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8">
      <h3 className="text-xl font-semibold leading-6 text-gray-900">
        Inter-Conference Performance
      </h3>

      <div className="flex flex-col items-center gap-5">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dd className="text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
              <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
            </div>
          ))}
          {statsLower.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dd
                key={item.name}
                className={clsx(
                  "text-3xl font-semibold tracking-tight text-gray-900",
                  item.className,
                )}
              >
                {item.stat}
              </dd>
              <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default interConferenceStatsTable;
