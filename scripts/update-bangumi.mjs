import fs from "node:fs";
import path from "node:path";

const USER_ID = "1215370";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/bangumi-data.json");

async function fetchBangumiData() {
  console.log(`Fetching Bangumi data for user ${USER_ID}...`);

  try {
    // Fetch user collections from Bangumi API v0
    // type: 1 = anime, 2 = manga, 3 = music, 4 = game, 6 = real
    const url = `https://api.bgm.tv/v0/users/${USER_ID}/collections?type=1&limit=30&offset=0`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MizukiBlog/1.0 (https://github.com/Jameskyzx/Jamesky)",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log(`API response keys: ${Object.keys(data)}`);
    console.log(`Data length: ${Array.isArray(data) ? data.length : data.data?.length}`);

    // Handle both array response and object response
    const items = Array.isArray(data) ? data : (data.data || []);

    const animeList = items.map((item) => ({
      title: item.subject?.name || item.subject?.name_cn || "Unknown",
      cover: item.subject?.images?.large || "",
      link: `https://bgm.tv/subject/${item.subject?.id}`,
      status: mapStatus(item.status),
      rating: item.subject?.score || 0,
      progress: item.episode || 0,
      totalEpisodes: item.subject?.eps || 12,
      description: "",
      year: item.subject?.date?.split("-")[0] || "",
      studio: "",
      genre: [],
    }));

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(animeList, null, 2), "utf-8");
    console.log(`Saved ${animeList.length} anime to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Failed to fetch Bangumi data:", error);
    process.exit(1);
  }
}

function mapStatus(status) {
  const map = {
    doing: "watching",
    on_hold: "onhold",
    dropped: "dropped",
    collect: "completed",
    wish: "planned",
    "": "planned",
  };
  return map[status] || "planned";
}

fetchBangumiData();