const countrySlugs = {
  "United Kingdom": "england",
  "United States": "usa",
  "Czechia (Czech Republic)": "czech-republic",
  "Democratic Republic of the Congo": "dr-congo",
  "Bosnia and Herzegovina": "bosnia-herzegovina",
  "South Africa": "south-africa",
  "Ivory Coast": "ivory-coast",
  "United Arab Emirates": "uae",
  "Palestine State": "palestine",
  "South Korea": "korea",
  // Add other exceptions as needed for full Betexplorer compatibility
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u')
    .replace(/[áâãàåāă]/g,'a').replace(/[éèêëēĕėę]/g,'e')
    .replace(/[íîïìīĭį]/g,'i').replace(/[óôõòöōŏő]/g,'o')
    .replace(/[úûùüūŭůű]/g,'u').replace(/[çćčĉċ]/g,'c')
    .replace(/[ñń]/g,'n').replace(/[şśšŝș]/g,'s')
    .replace(/[žźż]/g,'z').replace(/[ýÿ]/g,'y')
    .replace(/[ğ]/g,'g').replace(/[ř]/g,'r')
    .replace(/[ł]/g,'l').replace(/[ß]/g,'ss')
    .replace(/[\s']/g, '-')      // spaces and apostrophes to hyphens
    .replace(/[\(\)]/g, '')      // remove parentheses
    .replace(/[^a-z0-9-]/g, '')  // remove non-alphanumeric/hyphen
    .replace(/--+/g, '-')
    .replace(/-+$/g, '')
    .replace(/^-+/g, '');
}

export function getBetexplorerUrl(country, league) {
  // Custom mapping for major leagues with special Betexplorer URLs
  const custom = {
    "United Kingdom:Premier League": "/soccer/england/premier-league/",
    "United Kingdom:Championship": "/soccer/england/championship/",
    "United Kingdom:League One": "/soccer/england/league-one/",
    "United Kingdom:League Two": "/soccer/england/league-two/",
    "United States:Major League Soccer": "/soccer/usa/mls/",
    "United States:USL Championship": "/soccer/usa/usl-championship/",
    "Spain:La Liga": "/soccer/spain/laliga/",
    "Spain:Segunda División": "/soccer/spain/segunda-division/",
    "Germany:Bundesliga": "/soccer/germany/bundesliga/",
    "Germany:2. Bundesliga": "/soccer/germany/2-bundesliga/",
    "Germany:3. Liga": "/soccer/germany/3-liga/",
    "Italy:Serie A": "/soccer/italy/serie-a/",
    "Italy:Serie B": "/soccer/italy/serie-b/",
    "Italy:Serie C": "/soccer/italy/serie-c/",
    "France:Ligue 1": "/soccer/france/ligue-1/",
    "France:Ligue 2": "/soccer/france/ligue-2/",
    "Portugal:Primeira Liga": "/soccer/portugal/primeira-liga/",
    "Portugal:Liga Portugal 2": "/soccer/portugal/segunda-liga/",
    "Netherlands:Eredivisie": "/soccer/netherlands/eredivisie/",
    "Netherlands:Eerste Divisie": "/soccer/netherlands/eerste-divisie/",
    "Turkey:Süper Lig": "/soccer/turkey/super-lig/",
    "Turkey:TFF First League": "/soccer/turkey/1-lig/",
    "Belgium:Pro League": "/soccer/belgium/jupiler-league/",
    "Belgium:Challenger Pro League": "/soccer/belgium/first-division-b/",
    "Switzerland:Swiss Super League": "/soccer/switzerland/super-league/",
    "Switzerland:Challenge League": "/soccer/switzerland/challenge-league/",
    "Norway:Eliteserien": "/soccer/norway/eliteserien/",
    "Norway:1. divisjon": "/soccer/norway/obos-ligaen/",
    "Sweden:Allsvenskan": "/soccer/sweden/allsvenskan/",
    "Sweden:Superettan": "/soccer/sweden/superettan/",
    "Denmark:Danish Superliga": "/soccer/denmark/superliga/",
    "Denmark:1st Division": "/soccer/denmark/1st-division/",
    "Russia:Russian Premier League": "/soccer/russia/premier-league/",
    "Russia:Russian First League": "/soccer/russia/first-league/",
    "Ukraine:Ukrainian Premier League": "/soccer/ukraine/premier-league/",
    "Ukraine:Ukrainian First League": "/soccer/ukraine/first-league/"
    // Add more as you discover Betexplorer exceptions
  };
  const key = `${country}:${league}`;
  if (custom[key]) return custom[key];

  let countrySlug = countrySlugs[country] || slugify(country);
  let leagueSlug = slugify(league);

  return `/soccer/${countrySlug}/${leagueSlug}/`;
}