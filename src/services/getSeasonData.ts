import { tabletojson as tableToJson } from "tabletojson";
import seasonData from "~/seasonData";
import { currentSeason, seasonDataSchema } from "~/types";
import { getSeasonName } from "~/utilities";
import type { AllSeasonData } from "~/types";
import { revalidateTag } from "next/cache";

const getLocalSeasonData = (season: number) => seasonData[season];

const getError = (season: number) => () => {
  console.log(`Could not find NBA rankings for ${getSeasonName(season)}`);
  revalidateTag(`standings-${season}`);
  return undefined;
};

const fetchSeasonData = async (season: number) => {
  const error = getError(season);

  try {
    const hoursToCache = season === currentSeason ? 6 : 30 * 24;

    const basketballReferenceHtml = await fetch(
      `https://www.basketball-reference.com/leagues/NBA_${season}_standings.html`,
      { next: { revalidate: hoursToCache * 60 * 60, tags: [`standings-${season}`] } },
    )
      .then((res) => res.text())
      .catch(() => undefined);

    if (!basketballReferenceHtml) return error();

    const expandedStandingsTable = basketballReferenceHtml
      .match(/<table.*?id="expanded_standings"(.|\s)*?<\/table>/gim)
      ?.find(() => true)
      ?.replace(/<colgroup.*?<\/colgroup>/gim, "")
      ?.replace(/<tr.*?class="over_header"(.|\s)*?<\/tr>/gim, "")
      ?.replaceAll("<th s", "<td s");

    if (!expandedStandingsTable) return error();

    const seasonDataResult = seasonDataSchema.safeParse(
      tableToJson.convert(expandedStandingsTable)?.find(() => true),
    );

    if (!seasonDataResult.success) return error();

    return seasonDataResult.data;
  } catch {
    return error();
  }
};

const getSeasonData = async (season: number) =>
  getLocalSeasonData(season) ?? (await fetchSeasonData(season));

const getAllSeasonData = async (seasons: number[]) => {
  const allSeasonData: AllSeasonData = {};

  const seasonDataTasks = seasons.map(async (season) => {
    const seasonData = await getSeasonData(season);
    if (seasonData) allSeasonData[season] = seasonData;
  });

  await Promise.allSettled(seasonDataTasks);

  return allSeasonData;
};

export { getSeasonData, getAllSeasonData };
