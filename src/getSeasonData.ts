import rawSeasonData from "~/rawSeasonData";
import type { Season } from "~/rawSeasonData";

type Conference = (typeof conferences)[number];
type TeamName = (typeof rawSeasonData)[Season][number]["Team"];

const conferences = ["East", "West"] as const;

const teamConferences = {
  "Atlanta Hawks": "East",
  "Boston Celtics": "East",
  "Brooklyn Nets": "East",
  "Charlotte Hornets": "East",
  "Chicago Bulls": "East",
  "Cleveland Cavaliers": "East",
  "Detroit Pistons": "East",
  "Indiana Pacers": "East",
  "Miami Heat": "East",
  "Milwaukee Bucks": "East",
  "New York Knicks": "East",
  "Orlando Magic": "East",
  "Philadelphia 76ers": "East",
  "Toronto Raptors": "East",
  "Washington Wizards": "East",
  "Dallas Mavericks": "West",
  "Denver Nuggets": "West",
  "Golden State Warriors": "West",
  "Houston Rockets": "West",
  "Los Angeles Clippers": "West",
  "Los Angeles Lakers": "West",
  "Memphis Grizzlies": "West",
  "Minnesota Timberwolves": "West",
  "New Orleans Pelicans": "West",
  "Oklahoma City Thunder": "West",
  "Phoenix Suns": "West",
  "Portland Trail Blazers": "West",
  "Sacramento Kings": "West",
  "San Antonio Spurs": "West",
  "Utah Jazz": "West",
  "Seattle SuperSonics": "West",
  "New Jersey Nets": "East",
  "Vancouver Grizzlies": "West",
  "New Orleans/Oklahoma City Hornets": "West",
  "Charlotte Bobcats": "East",
  "Washington Bullets": "East",
  "Kansas City Kings": "West",
  "San Diego Clippers": "West",
} as const satisfies Record<
  Exclude<TeamName, "New Orleans Hornets">,
  Conference
>;

const teamShortNames = {
  "Atlanta Hawks": "Hawks",
  "Boston Celtics": "Celtics",
  "Brooklyn Nets": "Nets",
  "Charlotte Hornets": "Hornets",
  "Chicago Bulls": "Bulls",
  "Cleveland Cavaliers": "Cavaliers",
  "Dallas Mavericks": "Mavericks",
  "Denver Nuggets": "Nuggets",
  "Detroit Pistons": "Pistons",
  "Golden State Warriors": "Warriors",
  "Houston Rockets": "Rockets",
  "Indiana Pacers": "Pacers",
  "Los Angeles Clippers": "Clippers",
  "Los Angeles Lakers": "Lakers",
  "Memphis Grizzlies": "Grizzlies",
  "Miami Heat": "Heat",
  "Milwaukee Bucks": "Bucks",
  "Minnesota Timberwolves": "Timberwolves",
  "New Orleans Pelicans": "Pelicans",
  "New York Knicks": "Knicks",
  "Oklahoma City Thunder": "Thunder",
  "Orlando Magic": "Magic",
  "Philadelphia 76ers": "76ers",
  "Phoenix Suns": "Suns",
  "Portland Trail Blazers": "Trail Blazers",
  "Sacramento Kings": "Kings",
  "San Antonio Spurs": "Spurs",
  "Toronto Raptors": "Raptors",
  "Utah Jazz": "Jazz",
  "Washington Wizards": "Wizards",
  "Seattle SuperSonics": "SuperSonics",
  "New Jersey Nets": "Nets",
  "Vancouver Grizzlies": "Grizzlies",
  "New Orleans/Oklahoma City Hornets": "Hornets",
  "Charlotte Bobcats": "Bobcats",
  "New Orleans Hornets": "Hornets",
  "Washington Bullets": "Bullets",
  "Kansas City Kings": "Kings",
  "San Diego Clippers": "Clippers",
} as const satisfies Record<TeamName, string>;

type TeamRecord = `${number}-${number}`;

type GameStats = {
  wins: number;
  losses: number;
  gamesPlayed: number;
  winRatio: number;
};

const parseWinStats = (record: TeamRecord): GameStats => {
  const [wins, losses] = record.split("-").map((val) => parseInt(val, 10));
  if (wins === undefined || losses === undefined)
    throw "Failed to parse wins and losses from record";

  const gamesPlayed = wins + losses;
  const winRatio = wins / gamesPlayed;

  return { wins, losses, gamesPlayed, winRatio };
};

const getSeasonData = (season: Season, adjustmentWeight: number) => {
  const teams = rawSeasonData[season].map((data) => {
    const teamName = data.Team;
    const shortTeamName = teamShortNames[teamName];
    const conference =
      teamName !== "New Orleans Hornets"
        ? teamConferences[teamName]
        : season >= 2005
          ? "West"
          : "East";
    1;

    const overall = parseWinStats(data.Overall);
    const vsEast = parseWinStats(data.E);
    const vsWest = parseWinStats(data.W);
    const innerConference = conference === "East" ? vsEast : vsWest;
    const interConference = conference === "East" ? vsWest : vsEast;

    return {
      teamName,
      shortTeamName,
      conference,
      overall,
      vsEast,
      vsWest,
      innerConference,
      interConference,
    };
  });

  const interConferenceStats = teams.reduce(
    (acc, team) => {
      if (team.conference === "East") return acc;

      return {
        ...acc,
        gamesPlayed: acc.gamesPlayed + team.vsEast.wins + team.vsEast.losses,
        East: {
          ...acc.East,
          wins: acc.East.wins + team.vsEast.losses,
        },
        West: {
          ...acc.West,
          wins: acc.West.wins + team.vsEast.wins,
        },
      };
    },
    {
      gamesPlayed: 0,
      East: {
        wins: 0,
        winValue: 0,
        lossValue: 0,
      },
      West: {
        wins: 0,
        winValue: 0,
        lossValue: 0,
      },
    },
  );

  conferences.forEach((conference) => {
    interConferenceStats[conference].winValue = Math.pow(
      (2 * interConferenceStats[conference].wins) /
        interConferenceStats.gamesPlayed,
      adjustmentWeight,
    );

    interConferenceStats[conference].lossValue =
      1.5 - interConferenceStats[conference].winValue / 2;
  });

  const teamsWithAdjustedStats = teams.map((team) => {
    const adjustedWins =
      team.vsEast.wins * interConferenceStats.East.winValue +
      team.vsWest.wins * interConferenceStats.West.winValue;

    const adjustedLosses =
      team.vsEast.losses * interConferenceStats.East.lossValue +
      team.vsWest.losses * interConferenceStats.West.lossValue;

    const adjusted: GameStats = {
      wins: adjustedWins,
      losses: adjustedLosses,
      gamesPlayed: adjustedWins + adjustedLosses,
      winRatio: adjustedWins / (adjustedWins + adjustedLosses),
    };

    return {
      ...team,
      adjusted,
    };
  });

  const teamsWithRankings = teamsWithAdjustedStats
    .sort((a, b) => b.overall.winRatio - a.overall.winRatio)
    .map((team, index) => ({
      ...team,
      ranking: index + 1,
    }))
    .sort((a, b) =>
      a.adjusted.winRatio === b.adjusted.winRatio
        ? a.ranking - b.ranking
        : b.adjusted.winRatio - a.adjusted.winRatio,
    )
    .map((team, index) => ({
      ...team,
      adjustedRanking: index + 1,
    }))
    .map((team) => ({
      ...team,
      rankingChange: team.ranking - team.adjustedRanking,
    }));

  return {
    teams: teamsWithRankings,
    interConferenceStats,
  };
};

type InterConferenceStats = ReturnType<
  typeof getSeasonData
>["interConferenceStats"];

type Teams = ReturnType<typeof getSeasonData>["teams"];

export default getSeasonData;
export type { InterConferenceStats, Teams };
