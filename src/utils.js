export function getBetexplorerUrl(country, league) {
  const map = {
    // England
    "United Kingdom:Premier League": "/soccer/england/premier-league/",
    "United Kingdom:Championship": "/soccer/england/championship/",
    "United Kingdom:League One": "/soccer/england/league-one/",
    "United Kingdom:League Two": "/soccer/england/league-two/",
    // Germany
    "Germany:Bundesliga": "/soccer/germany/bundesliga/",
    "Germany:2. Bundesliga": "/soccer/germany/2-bundesliga/",
    "Germany:3. Liga": "/soccer/germany/3-liga/",
    // France
    "France:Ligue 1": "/soccer/france/ligue-1/",
    "France:Ligue 2": "/soccer/france/ligue-2/",
    // Spain
    "Spain:La Liga": "/soccer/spain/laliga/",
    "Spain:Segunda División": "/soccer/spain/segunda-division/",
    // Italy
    "Italy:Serie A": "/soccer/italy/serie-a/",
    "Italy:Serie B": "/soccer/italy/serie-b/",
    // Netherlands
    "Netherlands:Eredivisie": "/soccer/netherlands/eredivisie/",
    "Netherlands:Eerste Divisie": "/soccer/netherlands/eerste-divisie/",
    // Portugal
    "Portugal:Primeira Liga": "/soccer/portugal/primeira-liga/",
    "Portugal:Segunda Liga": "/soccer/portugal/segunda-liga/",
    // Scotland
    "Scotland:Premiership": "/soccer/scotland/premiership/",
    "Scotland:Championship": "/soccer/scotland/championship/",
    "Scotland:League One": "/soccer/scotland/league-one/",
    "Scotland:League Two": "/soccer/scotland/league-two/",
    // Belgium
    "Belgium:Pro League": "/soccer/belgium/jupiler-league/",
    "Belgium:First Division B": "/soccer/belgium/first-division-b/",
    // Switzerland
    "Switzerland:Super League": "/soccer/switzerland/super-league/",
    "Switzerland:Challenge League": "/soccer/switzerland/challenge-league/",
    // Austria
    "Austria:Bundesliga": "/soccer/austria/bundesliga/",
    "Austria:2. Liga": "/soccer/austria/2-liga/",
    // Turkey
    "Turkey:Süper Lig": "/soccer/turkey/super-lig/",
    "Turkey:1. Lig": "/soccer/turkey/1-lig/",
    // Greece
    "Greece:Super League": "/soccer/greece/super-league/",
    // Russia
    "Russia:Premier League": "/soccer/russia/premier-league/",
    // Ukraine
    "Ukraine:Premier League": "/soccer/ukraine/premier-league/",
    // Denmark
    "Denmark:Superliga": "/soccer/denmark/superliga/",
    "Denmark:1st Division": "/soccer/denmark/1st-division/",
    // Sweden
    "Sweden:Allsvenskan": "/soccer/sweden/allsvenskan/",
    "Sweden:Superettan": "/soccer/sweden/superettan/",
    // Norway
    "Norway:Eliteserien": "/soccer/norway/eliteserien/",
    "Norway:OBOS-ligaen": "/soccer/norway/obos-ligaen/"
    // Add more as needed...
  };
  return map[`${country}:${league}`] || "";
}