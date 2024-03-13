import { z } from "zod";

const currentSeason = 2024;

const pastSeasons = [
  2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998,
  1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985,
  1984, 1983, 1982, 1981,
] as const;

const seasons = [currentSeason, ...pastSeasons] as const;

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

type CurrentSeason = typeof currentSeason;

type PastSeason = (typeof pastSeasons)[number];

type Season = (typeof seasons)[number];

type TeamName = (typeof teamNames)[number];

type Conference = (typeof conferences)[number];

type TeamRecord = z.infer<typeof teamRecordSchema>;

type SeasonData = z.infer<typeof seasonDataSchema>;

export {
  currentSeason,
  pastSeasons,
  seasons,
  teamNames,
  conferences,
  seasonDataSchema,
};
export type {
  CurrentSeason,
  Season,
  PastSeason,
  TeamName,
  Conference,
  TeamRecord,
  SeasonData,
};
