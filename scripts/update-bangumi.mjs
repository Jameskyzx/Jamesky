import fs from "node:fs";
import path from "node:path";

const USER_ID = "1215370";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/bangumi-data.json");

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function extractAnimeFromHTML(html) {
  const animeList = [];
  // Match: <a href="/subject/12345" ...> <img src="cover url"> </a> <small>Title</small>
  // The HTML structure for anime list items in Bangumi
  const itemRegex = /<a href="\/subject\/(\d+)"[^>]*>\s*<img src="([^"]+)"[^>]*>\s*<\/a>\s*<small>([^<]+)<\/small>/g;
  const coverRegex = /<a href="\/subject\/\d+"[^>]*>\s*<img src="([^"]+)"[^>]*>\s*<\/a>/g;

  // Try to find subject items with their covers
  const subjectRegex = /<a href="\/subject\/(\d+)"[^>]*>\s*<img src="([^"]+)"[^>]*>\s*<\/a>\s*<small>([^<]+)<\/small>/g;
  let match;
  while ((match = subjectRegex.exec(html)) !== null) {
    animeList.push({
      id: match[1],
      cover: match[2],
      title: match[3].trim(),
    });
  }
  return animeList;
}

async function fetchBangumiData() {
  console.log(`Fetching Bangumi anime data for user ${USER_ID}...`);

  try {
    // Fetch from Bangumi's anime list pages
    // type: do=watching, collect=watched, wish=planned
    const types = [
      { name: "do", status: "watching" },
      { name: "collect", status: "completed" },
      { name: "wish", status: "planned" },
    ];

    const allAnime = [];
    for (const t of types) {
      const url = `https://bgm.tv/anime/list/${USER_ID}/${t.name}`;
      console.log(`Fetching: ${url}`);
      const html = await fetchText(url);

      // Extract anime from HTML
      // Pattern: <a href="/subject/ID"><img src="COVER"></a><small>TITLE</small>
      const subjectRegex = /<a href="\/subject\/(\d+)"[^>]*>\s*<img src="([^"]+)"[^>]*>\s*<\/a>\s*<small>([^<]+)<\/small>/g;
      let match;
      while ((match = subjectRegex.exec(html)) !== null) {
        allAnime.push({
          title: match[3].trim(),
          cover: match[2],
          link: `https://bgm.tv/subject/${match[1]}`,
          status: t.status,
          rating: 0,
          progress: 0,
          totalEpisodes: 0,
          description: "",
          year: "",
          studio: "",
          genre: [],
        });
      }
      console.log(`Found ${t.name}: ${allAnime.filter(a => a.status === t.status).length} anime`);
    }

    // Deduplicate by title
    const seen = new Set();
    const uniqueAnime = allAnime.filter((a) => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueAnime, null, 2), "utf-8");
    console.log(`Saved ${uniqueAnime.length} unique anime to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Failed to fetch Bangumi data:", error);
    process.exit(1);
  }
}

fetchBangumiData();