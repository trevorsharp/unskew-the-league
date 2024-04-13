"use client";

import { useState } from "react";
import { currentSeason, seasonOptions } from "~/types";
import { getSeasonName } from "~/utilities";
import SeasonStats from "./SeasonStats";
import type { AllSeasonData } from "~/types";

type SeasonSelectionProps = {
  allSeasonData: AllSeasonData;
};

const SeasonSelection = ({ allSeasonData }: SeasonSelectionProps) => {
  const [seasonSelection, setSeasonSelection] = useState<number>(currentSeason);

  return (
    <div className="flex flex-col gap-6">
      <select
        id="season"
        name="season"
        className="block w-full max-w-[10.5rem] rounded-md border-0 py-2 pl-3 pr-10 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600"
        defaultValue={currentSeason}
        onChange={(event) => setSeasonSelection(parseInt(event.target.value))}
      >
        {seasonOptions.map((option) => (
          <option key={option} value={option}>
            {getSeasonName(option)}
          </option>
        ))}
      </select>

      <SeasonStats
        allSeasonData={allSeasonData}
        seasonSelection={seasonSelection}
      />
    </div>
  );
};

export default SeasonSelection;
