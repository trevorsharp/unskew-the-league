import getSeasonData from "~/getSeasonData";
import CrossConferenceStatsTable from "./CrossConferenceStatsTable";
import Rankings from "./Rankings";
import AdjustedRankings from "./AdjustedRankings";

type SeasonProps = {
  season: number;
};

const Season = ({ season }: SeasonProps) => {
  const { crossConferenceStatistics, teams } = getSeasonData(season);

  return (
    <div className="flex flex-col items-center gap-12">
      <CrossConferenceStatsTable
        crossConferenceStatistics={crossConferenceStatistics}
      />

      <div className="flex flex-col gap-12 lg:flex-row">
        <Rankings teams={teams} />
        <AdjustedRankings teams={teams} />
      </div>
    </div>
  );
};

export default Season;
