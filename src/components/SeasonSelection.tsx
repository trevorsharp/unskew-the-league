"use client";

import { useState } from "react";
import AdjustmentWeightSelection from "./AdjustmentWeightSelection";
import InterConferenceStatsTable from "./InterConferenceStatsTable";
import AdjustedRankings from "./AdjustedRankings";
import Rankings from "./Rankings";
import pastSeasonData from "~/pastSeasonData";
import getPageData from "~/services/getPageData";
import { currentSeason, seasons, pastSeasons } from "~/types";
import type { ChangeEvent } from "react";
import type { SeasonData, Season } from "~/types";

type SeasonSelectionProps = {
  currentSeasonData?: SeasonData;
};

const SeasonSelection = ({ currentSeasonData }: SeasonSelectionProps) => {
  const defaultSeason = currentSeasonData ? currentSeason : pastSeasons[0];
  const seasonOptions = currentSeasonData ? seasons : pastSeasons;

  const [seasonSelection, setSeasonSelection] = useState<Season>(defaultSeason);
  const [adjustmentWeight, setAdjustmentWeight] = useState<number>(1);

  const handleSeasonSelection = (event: ChangeEvent<HTMLSelectElement>) =>
    setSeasonSelection(parseInt(event.target.value) as Season);

  const seasonData =
    seasonSelection === currentSeason
      ? currentSeasonData
      : pastSeasonData[seasonSelection];

  if (!seasonData)
    return "An unexpected error occurred. Please try again later.";

  const { interConferenceStats, teams } = getPageData(
    seasonData,
    seasonSelection,
    adjustmentWeight,
  );

  return (
    <div className="flex flex-col gap-6">
      <select
        id="season"
        name="season"
        className="block w-full max-w-[10.5rem] rounded-md border-0 py-2 pl-3 pr-10 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600"
        defaultValue={defaultSeason}
        onChange={handleSeasonSelection}
      >
        {seasonOptions.map((option) => (
          <option key={option} value={option}>
            {option - 1}-{String(option % 100).padStart(2, "0")} Season
          </option>
        ))}
      </select>

      <div className="flex flex-col items-center gap-12">
        <AdjustmentWeightSelection
          onSelectAdjustmentWeight={setAdjustmentWeight}
        />

        <InterConferenceStatsTable
          interConferenceStats={interConferenceStats}
        />

        <div className="flex flex-col gap-12 lg:flex-row">
          <AdjustedRankings teams={teams} />
          <Rankings teams={teams} />
        </div>
      </div>
    </div>
  );
};

export default SeasonSelection;
