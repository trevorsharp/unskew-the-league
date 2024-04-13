import { getConference, getTeamShortName } from "~/utilities";
import type { SeasonData, TeamRecord } from "~/types";

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

const getConferenceWinValues = (
  interConferenceGamesPlayed: number,
  eastInterConferenceWins: number,
  westInterConferenceWins: number,
  adjustmentWeight: number,
) => {
  const getWinValue = (conferenceWins: number) =>
    Math.pow(
      (2 * conferenceWins) / interConferenceGamesPlayed,
      adjustmentWeight,
    );

  const getLossValue = (conferenceWins: number) =>
    Math.pow(getWinValue(conferenceWins), 0.25);

  return {
    eastWinValue: getWinValue(eastInterConferenceWins),
    westWinValue: getWinValue(westInterConferenceWins),
    eastLossValue: getLossValue(eastInterConferenceWins),
    westLossValue: getLossValue(westInterConferenceWins),
  };
};

const getPageData = (
  seasonData: SeasonData,
  season: number,
  adjustmentWeight: number,
) => {
  const teams = seasonData.map((data) => {
    const teamName = data.Team;
    const shortTeamName = getTeamShortName(teamName);
    const conference = getConference(teamName, season);

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

  const eastInterConferenceWins = teams
    .filter((team) => team.conference === "East")
    .reduce((acc, team) => acc + team.vsWest.wins, 0);

  const westInterConferenceWins = teams
    .filter((team) => team.conference === "West")
    .reduce((acc, team) => acc + team.vsEast.wins, 0);

  const interConferenceGamesPlayed =
    eastInterConferenceWins + westInterConferenceWins;

  const { eastWinValue, westWinValue, eastLossValue, westLossValue } =
    getConferenceWinValues(
      interConferenceGamesPlayed,
      eastInterConferenceWins,
      westInterConferenceWins,
      adjustmentWeight,
    );

  const interConferenceStats = {
    gamesPlayed: interConferenceGamesPlayed,
    East: {
      wins: eastInterConferenceWins,
      winValue: eastWinValue,
    },
    West: {
      wins: westInterConferenceWins,
      winValue: westWinValue,
    },
  };

  const teamsWithAdjustedStats = teams.map((team) => {
    const adjustedWins =
      team.vsEast.wins * eastWinValue + team.vsWest.wins * westWinValue;

    const adjustedLosses =
      team.vsEast.losses * eastLossValue + team.vsWest.losses * westLossValue;

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
  typeof getPageData
>["interConferenceStats"];

type Teams = ReturnType<typeof getPageData>["teams"];

export default getPageData;
export type { InterConferenceStats, Teams };
