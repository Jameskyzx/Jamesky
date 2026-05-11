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
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function parseAnimeFromHTML(html) {
  const results = [];
  const itemRegex = /<li id="item_(\d+)"[^>]*>([\s\S]*?)<\/li>/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(html)) !== null) {
    const itemId = itemMatch[1];
    const block = itemMatch[2];
    const coverMatch = block.match(/<img src="([^"]+)"[^>]*class="cover"[^>]*>/);
    const titleMatch = block.match(/<a href="\/subject\/\d+" class="l">([^<]+)<\/a>/);
    const ratingMatch = block.match(/starlight stars(\d+)/);
    if (coverMatch && titleMatch) {
      let cover = coverMatch[1];
      if (cover.startsWith("//")) {
        cover = "https://" + cover.slice(2);
      }
      results.push({
        id: itemId,
        cover,
        title: titleMatch[1].trim(),
        userRating: ratingMatch ? parseInt(ratingMatch[1], 10) : 0,
      });
    }
  }
  return results;
}

// Studio detection: look for known studio names in tags
const STUDIO_KEYWORDS = [
  "MADHouse", "A-1 Pictures", "Production I.G", "WITSTUDIO", "CloverWorks",
  "Kyoto Animation", "京阿尼", "SHAFT", "SUNRISE", "P.A.Works",
  "J.C.Staff", "Studio Ghibli", "吉卜力", "SILVERLINK", "C2C",
  "Nitroplus", "nexus", "Nexus", "Doga Kobo", "White Fox",
  "Science SARU", "Satelight", "Pierrot", "TMS Entertainment",
  "Studio Pierrot", "Rooters", "CoMix Wave Films",
];

async function fetchSubjectDetails(subjectId) {
  try {
    const data = await fetchJSON(`https://api.bgm.tv/v0/subjects/${subjectId}`);

    // Extract studio from tags
    let studio = "";
    if (data.tags && Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        if (STUDIO_KEYWORDS.some(k =>
          tag.name.toLowerCase().includes(k.toLowerCase()) ||
          k.toLowerCase().includes(tag.name.toLowerCase())
        )) {
          studio = tag.name;
          break;
        }
      }
    }

    // Extract year from date field
    const year = data.date ? data.date.split("-")[0] : "";

    // Extract genres (first 3 tags)
    const genre = data.tags ? data.tags.slice(0, 3).map(t => t.name) : [];

    // Extract description/summary
    const description = data.summary || "";

    return {
      studio,
      rating: data.score || 0,
      year,
      genre,
      description,
      totalEpisodes: data.eps || 0,
    };
  } catch (e) {
    console.error(`  Failed to fetch subject ${subjectId}: ${e.message}`);
    return { studio: "", rating: 0, year: "", genre: [], description: "", totalEpisodes: 0 };
  }
}

async function fetchBangumiData() {
  console.log(`Fetching Bangumi anime data for user ${USER_ID}...`);

  try {
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
      const items = parseAnimeFromHTML(html);
      console.log(`Found ${t.name}: ${items.length} anime`);

      for (const item of items) {
        console.log(`  Fetching API details for ${item.title} (${item.id})...`);
        const details = await fetchSubjectDetails(item.id);
        allAnime.push({
          title: item.title,
          cover: item.cover,
          link: `https://bgm.tv/subject/${item.id}`,
          status: t.status,
          rating: details.rating || item.userRating,
          progress: 0,
          totalEpisodes: details.totalEpisodes,
          description: details.description,
          year: details.year,
          studio: details.studio,
          genre: details.genre,
        });
      }
    }

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