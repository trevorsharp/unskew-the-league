"use client";

import { useState } from "react";
import getPageData from "~/services/getPageData";
import { getSeasonName } from "~/utilities";
import AdjustmentWeightSelection from "./AdjustmentWeightSelection";
import InterConferenceStatsTable from "./InterConferenceStatsTable";
import AdjustedRankings from "./AdjustedRankings";
import Rankings from "./Rankings";
import type { AllSeasonData } from "~/types";

type SeasonStatsProps = {
  allSeasonData: AllSeasonData;
  seasonSelection: number;
};

const SeasonStats = ({ allSeasonData, seasonSelection }: SeasonStatsProps) => {
  const [adjustmentWeight, setAdjustmentWeight] = useState<number>(1);

  const seasonData = allSeasonData[seasonSelection];

  if (!seasonData)
    return `Could not find data for the ${getSeasonName(seasonSelection)}`;

  const { interConferenceStats, teams } = getPageData(
    seasonData,
    seasonSelection,
    adjustmentWeight,
  );

  return (
    <div className="flex flex-col items-center gap-12">
      <AdjustmentWeightSelection
        onSelectAdjustmentWeight={setAdjustmentWeight}
      />

      <InterConferenceStatsTable interConferenceStats={interConferenceStats} />

      <div className="flex flex-col gap-12 lg:flex-row">
        <AdjustedRankings teams={teams} />
        <Rankings teams={teams} />
      </div>
    </div>
  );
};

export default SeasonStats;
