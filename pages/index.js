import { useEffect, useState } from "react";
import { getLeagueStandings } from "../apiFootball";
import { getLeagueIdByName } from "../utils";

export default function Home() {
  const [standings, setStandings] = useState(null);
  const [error, setError] = useState(null);

  // Example: Premier League, Season 2024
  const leagueName = "Premier League";
  const season = 2024;

  useEffect(() => {
    async function fetchStandings() {
      try {
        const leagueId = getLeagueIdByName(leagueName);
        if (!leagueId) throw new Error("League ID not found for " + leagueName);
        const data = await getLeagueStandings(leagueId, season);
        setStandings(data[0].league.standings[0]);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchStandings();
  }, []);

  return (
    <div>
      <h1>{leagueName} Standings ({season})</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      {standings ? (
        <ul>
          {standings.map(team => (
            <li key={team.team.id}>
              {team.rank}. {team.team.name} ({team.points} pts)
            </li>
          ))}
        </ul>
      ) : !error ? <p>Loading...</p> : null}
    </div>
  );
}
