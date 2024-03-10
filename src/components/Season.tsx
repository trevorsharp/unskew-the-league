"use client";

import { useState, useMemo } from "react";
import getSeasonData from "~/getSeasonData";
import CrossConferenceStatsTable from "./CrossConferenceStatsTable";
import Rankings from "./Rankings";
import AdjustedRankings from "./AdjustedRankings";
import ConferenceWeightSelection from "./ConferenceWeightSelection";

type SeasonProps = {
  season: number;
};

const Season = ({ season }: SeasonProps) => {
  const [weightSelection, setWeightSelecion] = useState<number>(1);

  const { crossConferenceStatistics, teams } = useMemo(
    () => getSeasonData(season, weightSelection),
    [season, weightSelection],
  );

  return (
    <div className="flex flex-col items-center gap-12">
      <ConferenceWeightSelection onSelectWeight={setWeightSelecion} />

      <CrossConferenceStatsTable
        crossConferenceStatistics={crossConferenceStatistics}
      />

      <div className="flex flex-col gap-12 lg:flex-row">
        <AdjustedRankings teams={teams} />
        <Rankings teams={teams} />
      </div>
    </div>
  );
};

export default Season;
