import { tabletojson as tableToJson } from "tabletojson";
import seasonData from "@/seasonData";
import { currentSeason, seasonDataSchema, seasonOptions } from "@/types";
import { getSeasonName } from "@/utilities";
import type { AllSeasonData } from "@/types";

const cache = new Map<number, { data: AllSeasonData[number]; expiresAt: number }>();

const getLocalSeasonData = (season: number) => seasonData[season];

const getError = (season: number) => () => {
  console.log(`Could not find NBA rankings for ${getSeasonName(season)}`);
  return undefined;
};

const fetchSeasonData = async (season: number) => {
  const error = getError(season);

  try {
    console.log("Fetching data from Basketball Reference");
    const basketballReferenceHtml = await fetch(
      `https://www.basketball-reference.com/leagues/NBA_${season}_standings.html`,
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

const getSeasonData = async (season: number) => {
  const localSeasonData = getLocalSeasonData(season);
  if (localSeasonData) return localSeasonData;

  const cachedSeasonData = cache.get(season);
  if (cachedSeasonData && cachedSeasonData.expiresAt > Date.now()) return cachedSeasonData.data;

  const fetchedSeasonData = await fetchSeasonData(season);
  const hoursToCache = season === currentSeason ? 6 : 30 * 24;
  cache.set(season, {
    data: fetchedSeasonData,
    expiresAt: Date.now() + hoursToCache * 60 * 60 * 1000,
  });

  return fetchedSeasonData;
};

const getAllSeasonData = async () => {
  const allSeasonData: AllSeasonData = {};

  const seasonDataTasks = seasonOptions.map(async (season) => {
    const seasonData = await getSeasonData(season);
    if (seasonData) allSeasonData[season] = seasonData;
  });

  await Promise.allSettled(seasonDataTasks);

  return allSeasonData;
};

export { getAllSeasonData, getSeasonData };
