import { useState } from "react";
import getPageData from "@ui/utilities/getPageData";
import { getSeasonName } from "@/utilities";
import AdjustedRankings from "@ui/components/AdjustedRankings";
import AdjustmentWeightSelection from "@ui/components/AdjustmentWeightSelection";
import InterConferenceStatsTable from "@ui/components/InterConferenceStatsTable";
import Rankings from "@ui/components/Rankings";
import type { AllSeasonData } from "@/types";

type SeasonStatsProps = { allSeasonData: AllSeasonData; seasonSelection: number };

const SeasonStats = ({ allSeasonData, seasonSelection }: SeasonStatsProps) => {
  const [adjustmentWeight, setAdjustmentWeight] = useState<number>(1);
  const seasonData = allSeasonData[seasonSelection];

  if (!seasonData) return `Could not find data for the ${getSeasonName(seasonSelection)}`;

  const { interConferenceStats, teams } = getPageData(
    seasonData,
    seasonSelection,
    adjustmentWeight,
  );

  return (
    <div className="flex flex-col items-center gap-12">
      <AdjustmentWeightSelection onSelectAdjustmentWeight={setAdjustmentWeight} />
      <InterConferenceStatsTable interConferenceStats={interConferenceStats} />
      <div className="flex flex-col gap-12 lg:flex-row">
        <AdjustedRankings teams={teams} />
        <Rankings teams={teams} />
      </div>
    </div>
  );
};

export default SeasonStats;
