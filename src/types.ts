import { z } from "zod";

const currentYear = new Date().getUTCFullYear();
const isAfterOctober = new Date().getUTCMonth() > 9;
const currentSeason = isAfterOctober ? currentYear + 1 : currentYear;

const seasonSchema = z.coerce.number().min(1981).max(currentSeason);

const seasonOptions = Array.from({ length: currentSeason - 1980 }, (_, index) => index + 1981).sort(
  (a, b) => b - a,
);

const teamNames = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Bobcats",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "Kansas City Kings",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Jersey Nets",
  "New Orleans Hornets",
  "New Orleans Pelicans",
  "New Orleans/Oklahoma City Hornets",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "San Diego Clippers",
  "Seattle SuperSonics",
  "Toronto Raptors",
  "Utah Jazz",
  "Vancouver Grizzlies",
  "Washington Bullets",
  "Washington Wizards",
] as const;

const conferences = ["East", "West"] as const;

const teamRecordSchema = z.custom<`${number}-${number}`>((val) => {
  return typeof val === "string" ? /^\d+-\d+$/.test(val) : false;
});

const seasonDataSchema = z.array(
  z
    .object({
      Team: z.enum(teamNames),
      Overall: teamRecordSchema,
      E: teamRecordSchema,
      W: teamRecordSchema,
    })
    .passthrough(),
);

type TeamName = (typeof teamNames)[number];

type Conference = (typeof conferences)[number];

type TeamRecord = z.infer<typeof teamRecordSchema>;

type SeasonData = z.infer<typeof seasonDataSchema>;

type AllSeasonData = Record<number, SeasonData | undefined>;

export { conferences, currentSeason, seasonDataSchema, seasonOptions, seasonSchema, teamNames };
export type { AllSeasonData, Conference, SeasonData, TeamName, TeamRecord };
