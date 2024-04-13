import clsx from "clsx";
import type { Teams } from "~/services/getPageData";

type AdjustedRankingsProps = {
  teams: Teams;
};

const AdjustedRankings = ({ teams }: AdjustedRankingsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-semibold leading-6 text-gray-900">Adjusted Rankings</h3>

      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th scope="col" className="py-3 pl-2 pr-1">
                #
              </th>
              <th scope="col" className="px-3 py-3">
                Team
              </th>
              <th scope="col" className="px-1 py-3"></th>
              <th scope="col" className="px-3 py-3">
                Adj. Record
              </th>
              <th scope="col" className="px-3 py-3">
                Win %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white tracking-tight xs:tracking-normal">
            {teams
              .sort((a, b) => a.adjustedRanking - b.adjustedRanking)
              .map((team) => (
                <tr key={team.teamName} className="whitespace-nowrap text-xs xs:text-sm">
                  <td className="py-2 pl-2 pr-1 font-medium text-gray-900">
                    {team.adjustedRanking}
                  </td>
                  <td className="px-2 py-2 font-medium text-gray-900 sm:px-3">
                    {team.shortTeamName}
                  </td>
                  <td
                    className={clsx(
                      "w-[3.5rem] px-1 py-2 text-gray-500 sm:px-3",
                      team.rankingChange > 0 && "text-green-600",
                      team.rankingChange < 0 && "text-red-600",
                    )}
                  >
                    {team.rankingChange === 0
                      ? "-"
                      : `${team.rankingChange < 0 ? "↓" : "↑"} ${Math.abs(team.rankingChange)}`}
                  </td>
                  <td className="px-2 py-2 text-center tabular-nums text-gray-500 sm:px-3">
                    {team.adjusted.wins.toFixed(1)}
                    {" - "}
                    {team.adjusted.losses.toFixed(1)}
                  </td>
                  <td className="px-2 py-2 text-center tabular-nums text-gray-500 sm:px-3">
                    {(team.adjusted.winRatio * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdjustedRankings;
