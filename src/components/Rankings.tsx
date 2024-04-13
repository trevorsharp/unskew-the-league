import type { Teams } from "~/services/getPageData";

type RankingsProps = {
  teams: Teams;
};

const Rankings = ({ teams }: RankingsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-semibold leading-6 text-gray-900">Unadjusted Rankings</h3>

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
              <th scope="col" className="px-3 py-3">
                Record
              </th>
              <th scope="col" className="px-3 py-3">
                Conf
              </th>
              <th scope="col" className="px-3 py-3">
                Win %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white tracking-tight xs:tracking-normal">
            {teams
              .sort((a, b) => a.ranking - b.ranking)
              .map((team) => (
                <tr key={team.teamName} className="whitespace-nowrap text-xs xs:text-sm">
                  <td className="py-2 pl-2 pr-1 font-medium text-gray-900">{team.ranking}</td>
                  <td className="px-2 py-2 font-medium text-gray-900 sm:px-3">
                    {team.shortTeamName}
                  </td>
                  <td className="px-2 py-2 text-center tabular-nums text-gray-500 sm:px-3">
                    {team.overall.wins}
                    {" - "}
                    {team.overall.losses}
                  </td>
                  <td className="px-2 py-2 text-center tabular-nums text-gray-500 sm:px-3">
                    {team.innerConference.wins}
                    {" - "}
                    {team.innerConference.losses}
                  </td>
                  <td className="px-2 py-2 text-center tabular-nums text-gray-500 sm:px-3">
                    {(team.overall.winRatio * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;
