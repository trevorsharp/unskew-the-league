"use client";

import { useState } from "react";
import getSeasonData from "~/getSeasonData";
import AdjustmentWeightSelection from "./AdjustmentWeightSelection";
import InterConferenceStatsTable from "./InterConferenceStatsTable";
import AdjustedRankings from "./AdjustedRankings";
import Rankings from "./Rankings";
import type { ChangeEvent } from "react";
import type { Season } from "~/rawSeasonData";

const seasonOptions = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
  1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984, 1983, 1982, 1981,
] as const satisfies readonly Season[];

const SeasonSelection = () => {
  const defaultSeason: Season = 2024;
  const [seasonSelection, setSeasonSelection] = useState<Season>(defaultSeason);
  const [adjustmentWeight, setAdjustmentWeight] = useState<number>(1);

  const handleSeasonSelection = (event: ChangeEvent<HTMLSelectElement>) =>
    setSeasonSelection(parseInt(event.target.value) as Season);

  const { interConferenceStats, teams } = getSeasonData(
    seasonSelection,
    adjustmentWeight,
  );

  return (
    <div className="flex flex-col gap-6">
      <select
        id="season"
        name="season"
        className="block w-full max-w-[11rem] rounded-md border-0 py-2 pl-3 pr-10 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
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
