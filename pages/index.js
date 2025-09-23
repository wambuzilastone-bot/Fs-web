import { useEffect, useState } from "react";
import { getFixtures, getLeagueStandings } from "../apiFootball";
import { getLeagueIdByName } from "../utils";

export default function Home() {
  const [fixtures, setFixtures] = useState([]);
  const [standings, setStandings] = useState({});
  const [error, setError] = useState(null);

  const leagueName = "Premier League"; // change league as needed
  const season = 2024;

  // Fetch standings + fixtures
  useEffect(() => {
    async function fetchData() {
      try {
        const leagueId = getLeagueIdByName(leagueName);
        if (!leagueId) throw new Error("League ID not found for " + leagueName);

        // Fetch standings first
        const standingsRes = await getLeagueStandings(leagueId, season);
        const teamsData = {};
        standingsRes[0].league.standings[0].forEach(team => {
          teamsData[team.team.id] = {
            name: team.team.name,
            wins: team.all.win,
            draws: team.all.draw,
            losses: team.all.lose,
            gf: team.all.goals.for,
            ga: team.all.goals.against,
            home: {
              w: team.home.win,
              d: team.home.draw,
              l: team.home.lose,
            },
            away: {
              w: team.away.win,
              d: team.away.draw,
              l: team.away.lose,
            },
          };
        });
        setStandings(teamsData);

        // Fetch fixtures for the next 7 days
        const today = new Date();
        const nextWeekFixtures = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];
          const fixturesRes = await getFixtures(leagueId, season, dateStr);
          nextWeekFixtures.push(...fixturesRes);
        }

        setFixtures(nextWeekFixtures);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  function calculateRSBS(homeTeamId, awayTeamId) {
    const home = standings[homeTeamId];
    const away = standings[awayTeamId];
    if (!home || !away) return null;

    // Line 1: Teams playing
    const line1 = `${home.name} vs ${away.name}`;

    // Line 2: Overall WDL ratio
    const line2 = `${home.wins}${home.draws}${home.losses} - ${away.wins}${away.draws}${away.losses}`;

    // Line 3: Goal ratio (GF/GA × 10, rounded)
    const homeGR = Math.round((home.gf / (home.ga || 1)) * 10);
    const awayGR = Math.round((away.gf / (away.ga || 1)) * 10);
    const line3 = `${homeGR} - ${awayGR}`;

    // Line 4: Home WDL vs Away WDL
    const line4 = `${home.home.w}${home.home.d}${home.home.l} - ${away.away.w}${away.away.d}${away.away.l}`;

    return { line1, line2, line3, line4 };
  }

  return (
    <div>
      <h1>{leagueName} Fixtures (Next 7 Days)</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      {fixtures.length > 0 ? (
        <ul>
          {fixtures.map(fix => {
            const rsbs = calculateRSBS(fix.teams.home.id, fix.teams.away.id);
            if (!rsbs) return null;
            const matchDate = new Date(fix.fixture.date).toLocaleString();
            return (
              <li key={fix.fixture.id} style={{ marginBottom: "20px" }}>
                <strong>{rsbs.line1}</strong> <br />
                {rsbs.line2} <br />
                {rsbs.line3} <br />
                {rsbs.line4} <br />
                <em>{matchDate}</em>
              </li>
            );
          })}
        </ul>
      ) : !error ? <p>Loading fixtures...</p> : null}
    </div>
  );
}
