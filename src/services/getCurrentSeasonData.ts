import { tabletojson as tableToJson } from "tabletojson";
import { withCache } from "./cacheService";
import { currentSeason, seasonDataSchema } from "~/types";

const errorMessage = `Could not find NBA rankings for ${currentSeason - 1}-${String(currentSeason % 100).padStart(2, "0")} Season`;

const getCurrentSeasonData = withCache(
  `${currentSeason}`,
  3600 * 6,
  async () => {
    try {
      console.error("Fetching data from Basketball Reference");

      const basketballReferenceHtml = await fetch(
        `https://www.basketball-reference.com/leagues/NBA_${currentSeason}_standings.html`,
      )
        .then((res) => res.text())
        .catch(() => undefined);

      if (!basketballReferenceHtml) {
        console.error(errorMessage);
        return undefined;
      }

      const expandedStandingsTable = basketballReferenceHtml
        .match(/<table.*?id="expanded_standings"(.|\s)*?<\/table>/gim)
        ?.find(() => true)
        ?.replace(/<colgroup.*?<\/colgroup>/gim, "")
        ?.replace(/<tr.*?class="over_header"(.|\s)*?<\/tr>/gim, "")
        ?.replaceAll("<th s", "<td s");

      if (!expandedStandingsTable) {
        console.error(errorMessage);
        return undefined;
      }

      const seasonDataResult = seasonDataSchema.safeParse(
        tableToJson.convert(expandedStandingsTable)?.find(() => true),
      );

      if (!seasonDataResult.success) {
        console.error(errorMessage);
        return undefined;
      }

      return seasonDataResult.data;
    } catch {
      console.error(errorMessage);
      return undefined;
    }
  },
);

export default getCurrentSeasonData;
