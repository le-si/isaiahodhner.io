
const redirects = [
	{ from: "/make-making-better/*", to: "/fearless-exploration" },
	{ from: "/98/*", to: "https://98.js.org/:splat" },
	{ from: "/jspaint/*", to: "https://jspaint.app/:splat" },
	{ from: "/wavey/*", to: "https://audio-editor.web.app/:splat" },
	{ from: "/ascii-hypercube/*", to: "https://1j01.github.io/ascii-hypercube/:splat" },
	{ from: "/true-random-movie/*", to: "https://1j01.github.io/true-random-movie/:splat" },
	{ from: "/tri-chromatic-keyboard/*", to: "https://1j01.github.io/tri-chromatic-keyboard/:splat" },
	{ from: "/guitar/*", to: "https://1j01.github.io/guitar/:splat" },
	{ from: "/midiflip/*", to: "https://1j01.github.io/midiflip/:splat" },
	{ from: "/nonsensical/*", to: "https://1j01.itch.io/nonsensical/" },
	{ from: "/multifiddle/*", to: "https://multifiddle.ml/:splat" },
	{ from: "/mind-map/*", to: "https://1j01.github.io/mind-map/:splat" },
	{ from: "/transpairency/*", to: "https://1j01.github.io/transpairency/:splat" },
	{ from: "/boxart/*", to: "https://1j01.github.io/boxart/:splat" },
	{ from: "/countdown.ml/*", to: "https://1j01.github.io/fliptimer/:splat" },
	{ from: "/fliptimer/*", to: "https://1j01.github.io/fliptimer/:splat" },
	{ from: "/tiamblia/*", to: "https://1j01.github.io/tiamblia-original/:splat" },
	{ from: "/tiamblia-original/*", to: "https://1j01.github.io/tiamblia-original/:splat" },
	{ from: "/slugg/*", to: "https://1j01.github.io/slugg/:splat" },
	{ from: "/columns/*", to: "https://1j01.github.io/columns/:splat" },
	{ from: "/mos/*", to: "https://1j01.github.io/mos/:splat" },
	{ from: "/1bpp/*", to: "https://1j01.github.io/1bpp/:splat" },
	{ from: "/board-game/*", to: "https://1j01.github.io/board-game/:splat" },
	{ from: "/une/*", to: "https://1j01.github.io/une/:splat" },
	{ from: "/stick-mangler/*", to: "https://1j01.github.io/stick-mangler/:splat" },
	{ from: "/pool/*", to: "https://1j01.github.io/pool/:splat" },
	{ from: "/dat-boi/*", to: "https://1j01.github.io/dat-boi/:splat" },
	{ from: "/pipes/http:/*", to: "https://1j01.github.io/pipes/" }, // I think this was meant to fix someone's broken link (this would be caught by the more general /pipes/* redirect but it would include the redundant path which isn't valid, so it would 404)
	{ from: "/pipes/*", to: "https://1j01.github.io/pipes/:splat" },
	{ from: "/ooplie/*", to: "https://1j01.github.io/ooplie/:splat" },
	{ from: "/choon.js/*", to: "https://1j01.github.io/choon.js/:splat" },
	{ from: "/cityship/*", to: "https://1j01.github.io/cityship/:splat" },
	{ from: "/gif-maker/*", to: "https://1j01.github.io/gif-maker/:splat" },
	{ from: "/organeq/*", to: "https://1j01.github.io/organeq/:splat" },
	{ from: "/palette.js/*", to: "https://1j01.github.io/anypalette.js/:splat" },
	{ from: "/anypalette.js/*", to: "https://1j01.github.io/anypalette.js/:splat" },
	{ from: "/pruzzle/*", to: "https://1j01.github.io/pruzzle/:splat" },
	{ from: "/simple-console/*", to: "https://1j01.github.io/simple-console/:splat" },
	{ from: "/whitebread/*", to: "https://1j01.github.io/whitebread/:splat" },
];

// relevant docs:
// https://firebase.google.com/docs/hosting/full-config#capture_url_segments_for_redirects

const fs = require("fs");
const path = require("path");
const firebaseConfigPath = path.join(__dirname, "../firebase.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));
firebaseConfig.hosting.redirects = redirects.flatMap((redirect) =>
	[{
		source: redirect.from.replace(/\/\*$/, ""),
		destination: redirect.to.replace(/:splat$/, ""),
		type: 301,
	}, {
		source: redirect.from.replace(/\/\*$/, "/:splat*"),
		destination: redirect.to,
		type: 301,
	}]
);
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, "\t"), "utf8");

module.exports = redirects;
