"use client";

import clsx from "clsx";
import type { CrossConferenceStatistics } from "~/getSeasonData";

type crossConferenceStatsTableProps = {
  crossConferenceStatistics: CrossConferenceStatistics;
};

const crossConferenceStatsTable = ({
  crossConferenceStatistics,
}: crossConferenceStatsTableProps) => {
  const {
    totalCrossConferenceGamesPlayed,
    easternConferenceWins,
    westernConferenceWins,
    easternConferenceWinValue,
    westernConferenceWinValue,
  } = crossConferenceStatistics;

  const stats = [
    {
      name: "Cross-Conference Games Played",
      stat: totalCrossConferenceGamesPlayed,
    },
    {
      name: "Eastern Conference Wins",
      stat: easternConferenceWins,
    },
    {
      name: "Western Conference Wins",
      stat: westernConferenceWins,
    },
  ];

  const statsLower = [
    {
      name: "Stronger Conference",
      stat:
        easternConferenceWins > westernConferenceWins
          ? "East"
          : westernConferenceWins > easternConferenceWins
            ? "West"
            : "-",
    },
    {
      name: "Eastern Conference Win Value",
      stat: easternConferenceWinValue.toFixed(2),
      className:
        easternConferenceWinValue > 1
          ? "text-green-600"
          : westernConferenceWinValue > 1
            ? "text-red-600"
            : "",
    },
    {
      name: "Western Conference Win Value",
      stat: westernConferenceWinValue.toFixed(2),
      className:
        easternConferenceWinValue > 1
          ? "text-red-600"
          : westernConferenceWinValue > 1
            ? "text-green-600"
            : "",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8">
      <h3 className="text-xl font-semibold leading-6 text-gray-900">
        Cross-Conference Performance
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

export default crossConferenceStatsTable;
