import { tabletojson as tableToJson } from "tabletojson";
import seasonData from "~/seasonData";
import { currentSeason, seasonDataSchema } from "~/types";
import { getSeasonName } from "~/utilities";
import type { AllSeasonData } from "~/types";

const getLocalSeasonData = (season: number) => seasonData[season];

const errorMessage = (season: number) => `Could not find NBA rankings for ${getSeasonName(season)}`;

const fetchSeasonData = async (season: number) => {
  try {
    const hoursToCache = season === currentSeason ? 6 : 30 * 24;

    const basketballReferenceHtml = await fetch(
      `https://www.basketball-reference.com/leagues/NBA_${season}_standings.html`,
      { next: { revalidate: hoursToCache * 60 * 60 } },
    )
      .then((res) => res.text())
      .catch(() => undefined);

    if (!basketballReferenceHtml) {
      console.error(errorMessage(season));
      return undefined;
    }

    const expandedStandingsTable = basketballReferenceHtml
      .match(/<table.*?id="expanded_standings"(.|\s)*?<\/table>/gim)
      ?.find(() => true)
      ?.replace(/<colgroup.*?<\/colgroup>/gim, "")
      ?.replace(/<tr.*?class="over_header"(.|\s)*?<\/tr>/gim, "")
      ?.replaceAll("<th s", "<td s");

    if (!expandedStandingsTable) {
      console.error(errorMessage(season));
      return undefined;
    }

    const seasonDataResult = seasonDataSchema.safeParse(
      tableToJson.convert(expandedStandingsTable)?.find(() => true),
    );

    if (!seasonDataResult.success) {
      console.error(errorMessage(season));
      return undefined;
    }

    return seasonDataResult.data;
  } catch {
    console.error(errorMessage(season));
    return undefined;
  }
};

const getSeasonData = async (season: number) =>
  getLocalSeasonData(season) ?? (await fetchSeasonData(season));

const getAllSeasonData = async (seasons: number[]) => {
  const allSeasonData: AllSeasonData = {};

  const seasonDataTasks = seasons.map(async (season) => {
    const seasonData = await getSeasonData(season);
    allSeasonData[season] = seasonData;
  });

  await Promise.allSettled(seasonDataTasks);

  return allSeasonData;
};

export { getSeasonData, getAllSeasonData };
