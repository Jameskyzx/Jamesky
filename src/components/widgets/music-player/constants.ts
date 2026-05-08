import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "KINGS",
		artist: "angela",
		cover: "/Jamesky/assets/music/covers/angela_kings.jpg",
		url: "/Jamesky/assets/music/angela - KINGS.flac",
		duration: 0,
	},
	{
		id: 2,
		title: "月華 (tsukihana)",
		artist: "北出菜奈",
		cover: "/Jamesky/assets/music/covers/月华.jpg",
		url: "/Jamesky/assets/music/北出菜奈 - 月華 -tsukihana-.ogg",
		duration: 0,
	},
	{
		id: 3,
		title: "万象将醒",
		artist: "铁痕电台-MSR _ 八点四十八",
		cover: "/Jamesky/assets/music/covers/万象将醒.png",
		url: "/Jamesky/assets/music/铁痕电台-MSR _ 八点四十八 - 万象将醒.flac",
		duration: 0,
	},
	{
		id: 4,
		title: "愛♡スクリ～ム!",
		artist: "AiScReam",
		cover: "/Jamesky/assets/music/covers/AiScReam_-_Ai_Scream!.png",
		url: "/Jamesky/assets/music/AiScReam - 愛♡スクリ～ム!.flac",
		duration: 0,
	},
	{
		id: 5,
		title: "流★群 Meteor Stream",
		artist: "GUMI",
		cover: "/Jamesky/assets/music/covers/流星群.jpg",
		url: "/Jamesky/assets/music/GUMI - 流★群Meteor Stream.ogg",
		duration: 0,
	},
	{
		id: 6,
		title: "Sunshine",
		artist: "OneRepublic",
		cover: "/Jamesky/assets/music/covers/onerepublic_sunshine.jpg",
		url: "/Jamesky/assets/music/OneRepublic - Sunshine.flac",
		duration: 0,
	},
	{
		id: 7,
		title: "自分REST@RT (自我重生)",
		artist: "THE IDOLM@STER",
		cover: "/Jamesky/assets/music/covers/自分REST@RT.jpg",
		url: "/Jamesky/assets/music/THE IDOLM＠STER - 自分REST@RT (自我重生) (M@STER VERSION).ogg",
		duration: 0,
	},
	{
		id: 8,
		title: "九九八十一",
		artist: "乐正绫",
		cover: "/Jamesky/assets/music/covers/九九八十一.jpg",
		url: "/Jamesky/assets/music/乐正绫 - 九九八十一.ogg",
		duration: 0,
	},
	{
		id: 9,
		title: "Mystic Light Quest (秘光寻旅)",
		artist: "塞壬唱片-MSR _ KOTONOHOUSE _ RANASOL _ Machico",
		cover: "/Jamesky/assets/music/covers/mystic.png",
		url: "/Jamesky/assets/music/塞壬唱片-MSR _ KOTONOHOUSE _ RANASOL _ Machico - Mystic Light Quest (秘光寻旅).flac",
		duration: 0,
	},
	{
		id: 10,
		title: "アイドル (偶像)",
		artist: "真栗",
		cover: "/Jamesky/assets/music/covers/Yoasobi_-_Idol.png",
		url: "/Jamesky/assets/music/真栗 - アイドル (偶像).flac",
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
