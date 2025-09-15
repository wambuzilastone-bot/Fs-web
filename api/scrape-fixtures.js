import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { leagueUrl } = req.query;
  if (!leagueUrl) return res.status(400).json({ error: 'leagueUrl is required' });

  try {
    const fixturesRes = await fetch(`https://www.betexplorer.com${leagueUrl}fixtures/`);
    const standingsRes = await fetch(`https://www.betexplorer.com${leagueUrl}table/`);

    const fixturesHtml = await fixturesRes.text();
    const standingsHtml = await standingsRes.text();

    const $f = cheerio.load(fixturesHtml);
    const $s = cheerio.load(standingsHtml);

    const table = {};
    $s('table.league-table tbody tr').each((_, el) => {
      const tds = $s(el).find('td');
      const team = $s(tds[1]).text().trim();
      if (!team) return;
      table[team] = {
        w: +$s(tds[2]).text(),
        d: +$s(tds[3]).text(),
        l: +$s(tds[4]).text(),
        gf: +$s(tds[5]).text(),
        ga: +$s(tds[6]).text(),
        home: {
          w: +$s(tds[8]).text(),
          d: +$s(tds[9]).text(),
          l: +$s(tds[10]).text()
        },
        away: {
          w: +$s(tds[12]).text(),
          d: +$s(tds[13]).text(),
          l: +$s(tds[14]).text()
        }
      };
    });

    const fixtures = [];
    $f('.table-main__item').each((_, el) => {
      const teams = $f(el).find('.table-main__tt').text().trim();
      if (!teams) return;
      const [home, away] = teams.split(' - ');
      const h = table[home] || {};
      const a = table[away] || {};
      fixtures.push({
        teams: `${home} vs ${away}`,
        wdl: `${h.w || 0}${h.d || 0}${h.l || 0} - ${a.w || 0}${a.d || 0}${a.l || 0}`,
        gfga: `${Math.round((h.gf || 0) / (h.ga || 1) * 10)} - ${Math.round((a.gf || 0) / (a.ga || 1) * 10)}`,
        homeAway: `${(h.home?.w || 0)}${(h.home?.d || 0)}${(h.home?.l || 0)} - ${(a.away?.w || 0)}${(a.away?.d || 0)}${(a.away?.l || 0)}`
      });
    });

    res.status(200).json({ fixtures });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
