import type { Conference, TeamName } from "~/types";

const getSeasonName = (season: number) =>
  `${season - 1}-${String(season % 100).padStart(2, "0")} Season`;

const getConference = (teamName: TeamName, season: number): Conference => {
  switch (teamName) {
    case "Atlanta Hawks":
    case "Boston Celtics":
    case "Brooklyn Nets":
    case "Charlotte Bobcats":
    case "Charlotte Hornets":
    case "Chicago Bulls":
    case "Cleveland Cavaliers":
    case "Detroit Pistons":
    case "Indiana Pacers":
    case "Miami Heat":
    case "Milwaukee Bucks":
    case "New Jersey Nets":
    case "New York Knicks":
    case "Orlando Magic":
    case "Philadelphia 76ers":
    case "Toronto Raptors":
    case "Washington Bullets":
    case "Washington Wizards":
      return "East";

    case "Dallas Mavericks":
    case "Denver Nuggets":
    case "Golden State Warriors":
    case "Houston Rockets":
    case "Kansas City Kings":
    case "Los Angeles Clippers":
    case "Los Angeles Lakers":
    case "Memphis Grizzlies":
    case "Minnesota Timberwolves":
    case "New Orleans Pelicans":
    case "New Orleans/Oklahoma City Hornets":
    case "Oklahoma City Thunder":
    case "Phoenix Suns":
    case "Portland Trail Blazers":
    case "Sacramento Kings":
    case "San Antonio Spurs":
    case "San Diego Clippers":
    case "Seattle SuperSonics":
    case "Utah Jazz":
    case "Vancouver Grizzlies":
      return "West";

    case "New Orleans Hornets":
      if (season >= 2005) return "West";
      return "East";
  }
};

const getTeamShortName = (teamName: TeamName) =>
  (
    ({
      "Atlanta Hawks": "Hawks",
      "Boston Celtics": "Celtics",
      "Brooklyn Nets": "Nets",
      "Charlotte Bobcats": "Bobcats",
      "Charlotte Hornets": "Hornets",
      "Chicago Bulls": "Bulls",
      "Cleveland Cavaliers": "Cavaliers",
      "Dallas Mavericks": "Mavericks",
      "Denver Nuggets": "Nuggets",
      "Detroit Pistons": "Pistons",
      "Golden State Warriors": "Warriors",
      "Houston Rockets": "Rockets",
      "Indiana Pacers": "Pacers",
      "Kansas City Kings": "Kings",
      "Los Angeles Clippers": "Clippers",
      "Los Angeles Lakers": "Lakers",
      "Memphis Grizzlies": "Grizzlies",
      "Miami Heat": "Heat",
      "Milwaukee Bucks": "Bucks",
      "Minnesota Timberwolves": "Timberwolves",
      "New Jersey Nets": "Nets",
      "New Orleans Hornets": "Hornets",
      "New Orleans Pelicans": "Pelicans",
      "New Orleans/Oklahoma City Hornets": "Hornets",
      "New York Knicks": "Knicks",
      "Oklahoma City Thunder": "Thunder",
      "Orlando Magic": "Magic",
      "Philadelphia 76ers": "76ers",
      "Phoenix Suns": "Suns",
      "Portland Trail Blazers": "Trail Blazers",
      "Sacramento Kings": "Kings",
      "San Antonio Spurs": "Spurs",
      "San Diego Clippers": "Clippers",
      "Seattle SuperSonics": "SuperSonics",
      "Toronto Raptors": "Raptors",
      "Utah Jazz": "Jazz",
      "Vancouver Grizzlies": "Grizzlies",
      "Washington Bullets": "Bullets",
      "Washington Wizards": "Wizards",
    }) as const
  )[teamName];

export { getConference, getSeasonName, getTeamShortName };
