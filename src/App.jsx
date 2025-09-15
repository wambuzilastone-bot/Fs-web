import React, { useState } from "react";
import countries from "./countries.json";
import flags from "./flags.json";
import { getBetexplorerUrl } from "./utils";

export default function App() {
  const [country, setCountry] = useState(null);
  const [league, setLeague] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleLeagueClick(league) {
    setLoading(true);
    setFixtures([]);
    setLeague(league);
    const leagueUrl = getBetexplorerUrl(country, league);
    if (!leagueUrl) { setLoading(false); return; }
    const res = await fetch(`/api/scrape-fixtures?leagueUrl=${leagueUrl}`);
    const data = await res.json();
    setFixtures(data.fixtures || []);
    setLoading(false);
  }

  return (
    <div>
      <header>
        <h1>REAL DATA ⚽</h1>
      </header>
      <div className="countries-list" style={{display:'flex',flexWrap:'wrap'}}>
        {Object.keys(countries).map((c) => (
          <div key={c} onClick={() => { setCountry(c); setLeague(null); setFixtures([]); }}
            style={{margin:'8px',cursor:'pointer',display:'flex',alignItems:'center'}}>
            <img src={flags[c]} alt={c} width={32} style={{ marginRight: 8 }} />
            <span>{c}</span>
          </div>
        ))}
      </div>
      {country && (
        <div className="leagues-list" style={{margin:'16px 0'}}>
          {countries[country].map((l) => (
            <button key={l} style={{margin:'0 8px'}} onClick={() => handleLeagueClick(l)}>{l}</button>
          ))}
        </div>
      )}
      {loading && <div className="spinner">Loading...</div>}
      {fixtures.length > 0 && (
        <div className="fixtures">
          {fixtures.map((fx, i) => (
            <pre key={i} style={{ fontFamily: "monospace",background:'#f9f9f9',padding:'8px',margin:'8px 0',borderRadius:'4px'}}>
              {fx.teams}
              <br />
              {fx.wdl}
              <br />
              {fx.gfga}
              <br />
              {fx.homeAway}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}
