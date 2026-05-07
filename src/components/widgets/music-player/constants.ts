import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "KINGS",
		artist: "angela",
		cover: "",
		url: "/Jamesky/assets/music/angela - KINGS.flac",
		duration: 0,
	},
	{
		id: 2,
		title: "月華 (tsukihana)",
		artist: "北出菜奈",
		cover: "",
		url: "/Jamesky/assets/music/北出菜奈 - 月華 -tsukihana-.ogg",
		duration: 0,
	},
	{
		id: 3,
		title: "万象将醒",
		artist: "铁痕电台-MSR _ 八点四十八",
		cover: "",
		url: "/Jamesky/assets/music/铁痕电台-MSR _ 八点四十八 - 万象将醒.flac",
		duration: 0,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
