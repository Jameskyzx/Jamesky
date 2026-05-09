import fetch from "node:fetch";
import fs from "node:fs";
import path from "node:path";

const USER_ID = "1215370";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/bangumi-data.json");

async function fetchBangumiData() {
  console.log(`Fetching Bangumi data for user ${USER_ID}...`);

  try {
    // Fetch user collections from Bangumi API v0
    const response = await fetch(
      `https://api.bgm.tv/v0/users/${USER_ID}/collections?type=1&limit=30`,
      {
        headers: {
          "User-Agent": "MizukiBlog/1.0",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // Transform Bangumi API response to our format
    const animeList = data.data.map((item) => ({
      title: item.subject.name || item.subject.name_cn || "Unknown",
      cover: item.subject.images?.large || "",
      link: `https://bgm.tv/subject/${item.subject.id}`,
      status: mapStatus(item.status),
      rating: item.subject.score || 0,
      progress: item.episode || 0,
      totalEpisodes: item.subject.eps || 12,
      description: "",
      year: item.subject.date?.split("-")[0] || "",
      studio: (item.subject.staff?.match(/^([^,]+),/)?.[1]) || "",
      genre: item.subject.tags?.slice(0, 3).map((t) => t.name) || [],
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