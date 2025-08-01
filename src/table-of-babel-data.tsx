import type { ReactElement } from "react";
import type { TOBData } from "./table-of-babel-types";

const logicGatesImageInfo = {
	src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXbRRK9aRVb-9-emctjCJnubaz1u5Ltce5ejFPvCsQA2WTgVtOhNrFdUsAAW0OtFvxs0EPkWZTk4JjSvMj4KdI7ilwnKbBpnkPNDjkmJh_Ne5lUpSUuy4Gjd5WzL_BfWlU9o6v6c5MRTc/s1600/fluid+logic+bowles.jpg",
	x: 220, y: 114, width: 900, height: 1479,
	cellsX: 5, cellsY: 8,
	row7CellHeight: 205, // this one is larger than the others
	// I THINK the "Key" is equivalent to a not gate
	rows: ["OR Gate", "NOR Gate", "AND Gate", "Flip-Flop", "NAND Gate", /*"Key"*/ "NOT Gate", "Binary Counter", "XOR Gate"],
	cols: ["N.F.P.A. Symbol", "Logic Symbol", "Valve Equivalent", "Electrical Equivalent", "Fluidic Silhouette"],
};
// function LogicGateImage({ row, col }): ReactElement {
// 	const x = logicGatesImageInfo.cols.indexOf(col);
// 	const y = logicGatesImageInfo.rows.indexOf(row);
// 	return <img src={logicGatesImageInfo.src} style={{ clipPath: `inset(${y * 100 / logicGatesImageInfo.cellsY}% ${100 - (x + 1) * 100 / logicGatesImageInfo.cellsX}% ${100 - (y + 1) * 100 / logicGatesImageInfo.cellsY}% ${x * 100 / logicGatesImageInfo.cellsX}%)` }} />;
// }
function LogicGateImage({ row, col }) {
	const { x: baseX, y: baseY, width, height, cellsX, cellsY, src } = logicGatesImageInfo;

	const colIndex = logicGatesImageInfo.cols.indexOf(col);
	const rowIndex = logicGatesImageInfo.rows.indexOf(row);

	const mostCellHeights = (height - logicGatesImageInfo.row7CellHeight) / (cellsY - 1);
	const cellWidth = width / cellsX;
	const cellHeight = row === "Binary Counter" ? logicGatesImageInfo.row7CellHeight : mostCellHeights;

	if (colIndex < 0 || rowIndex < 0) {
		throw new Error(`Invalid row "${row}" or column "${col}" for LogicGateImage.`);
	}

	const cropX = baseX + colIndex * cellWidth;
	let cropY = baseY;
	for (let i = 0; i < rowIndex; i++) {
		cropY += i === 6 ? logicGatesImageInfo.row7CellHeight : mostCellHeights;
	}

	return (
		<div style={{
			width: `${cellWidth}px`,
			height: `${cellHeight}px`,
			overflow: 'hidden',
			position: 'relative',
		}}>
			<img
				src={src}
				alt={`${row} - ${col}`}
				style={{
					position: 'absolute',
					left: `-${cropX}px`,
					top: `-${cropY}px`,
				}}
			/>
		</div>
	);
}


const data: TOBData = {
	"patternCategoryRelations": [
		{
			"sub": "Flip-Flop",
			"super": "Computation Primitive",
		},
		{
			"sub": "Transistor", // "Amplifier" might be a better general name
			"super": "Computation Primitive",
		},
		{
			"sub": "Binary Counter",
			"super": "Computation Primitive",
		},
		{
			"sub": "Logic Gate",
			"super": "Computation Primitive",
		},
		{
			"sub": "AND Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "OR Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "NOT Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "XOR Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "NOR Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "XNOR Gate",
			"super": "Logic Gate",
		},
		{
			"sub": "NAND Gate",
			"super": "Logic Gate",
		},
	],
	"domainCategoryRelations": [
		{
			"sub": "Fluid Dynamics",
			"super": "Physics",
		},
		{
			"sub": "Light",
			"super": "Physics",
		},
		{
			"sub": "Sound",
			"super": "Physics",
		},
		{
			"sub": "Electricity",
			"super": "Physics",
		},
		{
			"sub": "Mechanics",
			"super": "Physics",
		},
		{
			"sub": "Springs",
			"super": "Mechanics",
		},
		{
			"sub": "Road Networks",
			"super": "Sociology",
		},
	],
	"entries": [
		{
			"pattern": "Braess' Paradox",
			"domain": "Road Networks",
			"title": "Removing roads can improve traffic flow",
			"description": "Braess' Paradox shows that adding roads can counterintuitively increase congestion. Closing roads can improve traffic flow.",
			"flavor": "Yet another reason for Arthur Dent to be unsatisfied with 'you've got to build bypasses'.",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Sports",
			"title": "Star Player Overreliance",
			"description": "If all plays go through a star player, it may not be the fastest route to score?",
			"editorNote": "Theoretical. Seems a little dubious at first glance. Maybe want a way to show varying degrees of proven-ness.",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Springs",
			"title": "Cutting a rope can lift a load",
			"description": "Where you might expect cutting a rope to drop a load, simply stretching the slack ropes taut, it can actually lift it.",
			"image": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Braess-Paradoxon_der_Mechanik.svg",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Electricity",
			"title": "Power Grid Stability",
			"description": "Adding a path for electrons in a nano-scale network can reduce its conductance. Or adding new power lines can desynchronize the power grid.",
			"editorNote": "Is this the same phenomenon at different scales? Or are there different relations to phase? Can I just ditch 'nano-scale' to describe both? Or should I include two entries?",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Ecology",
			"title": "Doomed Species",
			"description": "Removal of a doomed species could lead to the survival of other species.",
			"editorNote": "Is this really Braess' Paradox? Or just basic competition? I guess the analogy is in the relation to the NETWORK of food chains... Parking this for now.",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Architecture", // TODO: "Civil Engineering"?
			"title": "Damping Vibrations",
			"description": "A mechanism that contracts when pulled can toggle between two natural frequencies when resonating with one of them. This could be used to avoid catastrophic vibrations in a bridge, although it may be overly complex.",
			"link": "https://youtu.be/-QTkPfq7w1A?t=1233",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Computer Science", // TODO: "Finance"? "Economics"? "Sociology"?
			"title": "Blockchain networks",
			"description": "Adding payment channels can increase fees.",
			"contributor": "1j01",
		},
		{
			"pattern": "Braess' Paradox",
			"domain": "Psychology",
			"title": "Prisoner's Dilemma?",
			"description": "In the Prisoner's Dilemma, cooperation may be better than betrayal, but betrayal is often chosen. I suppose this is related!",
			"editorNote": "Adding this one off the cuff, not sure if it fits Braess' Paradox properly.",
			"contributor": "1j01",
		},
		{
			"pattern": "Flip-Flop",
			"domain": "Fluid Dynamics",
			"title": "Fluidic oscillator/amplifier",
			"description": "The central chamber creates eddies that flow naturally into outputs, but this flow can be essentially toggled by a small input flow.",
			"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fluidicamplifier.svg/330px-Fluidicamplifier.svg.png",
			"link": "https://en.wikipedia.org/wiki/Fluidics#Components",
			"contributor": "1j01"
		},
		{
			"pattern": "Transistor",
			"domain": "Fluid Dynamics",
			"title": "Fluidic amplifier",
			"description": "The central chamber creates eddies that flow naturally into outputs, in proportion to inputs that influence the direction of the flow.",
			// TODO: clearer image (could crop this and remove the background)
			"image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6E_Qidj73rdXh6m6kBe84aFCsYSFoFfDACe_cZyc5SCyNwby1EEsbVDMRzGPh2h6qnQo9b5zBjWL58OH98ArtwcjY6WMA4grjBv2IYiTkFcUBnYcEB1DlpWQC5WGH-sl1USv7e6-tnaQ/s1600/popularfluidic.png",
			// "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fluidicamplifier.svg/330px-Fluidicamplifier.svg.png",
			"link": "https://en.wikipedia.org/wiki/Fluidics#Components",
			"contributor": "1j01"
		},
		// {
		// 	// TODO: separate entries for each gate
		// 	// maybe even a physics simulation of the gates?
		// 	"pattern": "Logic Gate",
		// 	"domain": "Fluid Dynamics",
		// 	"title": "Fluidic logic gates",
		// 	"description": "",
		// 	"image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXbRRK9aRVb-9-emctjCJnubaz1u5Ltce5ejFPvCsQA2WTgVtOhNrFdUsAAW0OtFvxs0EPkWZTk4JjSvMj4KdI7ilwnKbBpnkPNDjkmJh_Ne5lUpSUuy4Gjd5WzL_BfWlU9o6v6c5MRTc/s1600/fluid+logic+bowles.jpg",
		// 	// Image source isn't the best reference...
		// 	"link": "https://nummolt.blogspot.com/2016/05/fluidic-computers-logic-gates.html",
		// 	"contributor": "1j01"
		// },
		...logicGatesImageInfo.rows.map(row => ({
			// TODO: a physics simulation of the gates would be epic
			"pattern": row,
			"domain": "Fluid Dynamics",
			"title": "Fluidic " + row, //row + " Fluidic Logic Gate",
			"description": "",
			"image": <LogicGateImage row={row} col="Fluidic Silhouette" />,
			"link": "https://nummolt.blogspot.com/2016/05/fluidic-computers-logic-gates.html",
			"contributor": "1j01"
		})),
		// TODO: merge the separate entries that have the symbols into this mapped set that has lower level diagrams
		...logicGatesImageInfo.rows.map(row => ({
			// TODO: a physics simulation of the gates would be epic
			"pattern": row,
			"domain": "Electricity",
			"title": row,
			"description": "",
			"image": <LogicGateImage row={row} col="Electrical Equivalent" />,
			"link": "https://nummolt.blogspot.com/2016/05/fluidic-computers-logic-gates.html",
			"contributor": "1j01"
		})),
		{
			// TODO: separate entries for each gate
			// maybe even a physics simulation of the gates?
			"pattern": "Logic Gate",
			"domain": "Light",
			"title": "Photonic logic gates",
			"description": "",
			"image": "https://www.spiedigitallibrary.org/ContentImages/Journals/OPEGAR/62/1/010901/WebImages/OE_62_1_010901_f013.png",
			// not a logic gate, but a better image of the physical structure (array of nano-scale rods)
			// "image": "https://www.spiedigitallibrary.org/ContentImages/Journals/OPEGAR/62/1/010901/FigureImages/OE_62_1_010901_f011.png",
			"contributor": "1j01"
		},
		{
			// TODO: separate entries for each gate
			// maybe with interactive 3D models? a little three.js action? people have recreated Minecraft in three.js in multiple projects at least enough to DISPLAY redstone
			"pattern": "Logic Gate",
			"domain": "Minecraft",
			"title": "Redstone Logic Gates",
			"description": "(Note: the NAND is wrong in this image, the top comparator should be in subtraction mode)",
			// hotlinking not allowed on wikia
			// don't wanna just bring the image into the repo without checking for a license
			// "image": "https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0f/Compact-Redstone-Logic-Circuits.jpg/revision/latest?cb=20210728173647",
			// ah, from the image gallery I found the original source, which is hotlinkable
			"image": "https://i.redd.it/7xr9outg17z41.jpg",
			// "link": "https://www.reddit.com/r/Minecraft/comments/clkimg/no_interference_1_block_high_logic_gates/",
			"link": "https://minecraft.fandom.com/wiki/Redstone_circuits/Logic",
			// A nice diagram of torch-based gates and an extensive tutorial:
			// "image": "https://raw.githubusercontent.com/NewCaledoniaDevTeam/MountainsGuide/6bdee25a9010faae141746039198444934c7304d/docs/redstone/images/logic_circuit/logic_gates.png",
			// "link": "https://newcaledoniadevteam.github.io/MountainsGuide/redstone/",
			// Screenshot of torch-based gates:
			// https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6b/LogicGatesRedstone.jpg/revision/latest?cb=20240301005020
			// TODO: allow multiple references per entry
			// (should they be inline in text btw?)
			"contributor": "1j01"
		},
		{
			"pattern": "NOT Gate",
			"domain": "Electricity",
			"title": "NOT Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/b/bc/NOT_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "AND Gate",
			"domain": "Electricity",
			"title": "AND Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/6/64/AND_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "NAND Gate",
			"domain": "Electricity",
			"title": "NAND Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/f/f2/NAND_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "OR Gate",
			"domain": "Electricity",
			"title": "OR Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/b/b5/OR_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "NOR Gate",
			"domain": "Electricity",
			"title": "NOR Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/NOR_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "XNOR Gate",
			"domain": "Electricity",
			"title": "XNOR Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/XNOR_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "XOR Gate",
			"domain": "Electricity",
			"title": "XOR Gate",
			"description": "",
			"image": "https://upload.wikimedia.org/wikipedia/commons/0/01/XOR_ANSI.svg",
			"contributor": "1j01"
		},
		{
			"pattern": "NOT Gate",
			"domain": "Mathematics",
			"title": "Negation",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/92efef0e89bdc77f6a848764195ef5b9d9bfcc6a",
			"contributor": "1j01"
		},
		{
			"pattern": "AND Gate",
			"domain": "Mathematics",
			"title": "Conjunction",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/75a90e903f21f11a0f4ab3caca1e6943ba7a9849",
			"contributor": "1j01"
		},
		{
			"pattern": "NAND Gate",
			"domain": "Mathematics",
			"title": "Non-conjunction",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/225f35bb78e90b9126458f1bc6bf1ed3f0724bbf",
			"contributor": "1j01"
		},
		{
			"pattern": "OR Gate",
			"domain": "Mathematics",
			"title": "Disjunction",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/4279cdbd3cb8ec4c3423065d9a7d83a82cfc89e3",
			"contributor": "1j01"
		},
		{
			"pattern": "NOR Gate",
			"domain": "Mathematics",
			"title": "Non-disjunction",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/08840f8e2022f127fc459d801a8f8ce93f65f55a",
			"contributor": "1j01"
		},
		{
			"pattern": "XNOR Gate",
			"domain": "Mathematics",
			"title": "Equivalence",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/6a925c0f94e91b108609068c5ceae7c671db84d9",
			"contributor": "1j01"
		},
		{
			"pattern": "XOR Gate",
			"domain": "Mathematics",
			"title": "Non-equivalence",
			"description": "",
			"image": "https://wikimedia.org/api/rest_v1/media/math/render/svg/f0512d6bdd29ff000dea0bf68b853618dcaabc3e",
			"contributor": "1j01"
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Computer Science",
			"title": "Symmetric drawing",
			// "description": "Calling a drawing function twice, once with an inverted coordinate, easily gives mirror symmetry: plot(x, y); plot(-x, y);",
			// "description": "Calling a function twice, once with an inverted coordinate, gives mirror symmetry: for side in [-1, 1]: plot(side * x, y);",
			"description": "Calling a function twice, once with an inverted coordinate, gives mirror symmetry.",
			"editorNote": "Might want to make rich text easier, but for now I've added the code as an SVG image with text.",
			"image": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><style>text{font-family:monospace;white-space:preserve}</style><text x='10' y='20' font-size='16'>for side in [-1, 1]:</text><text x='10' y='40' font-size='16'>  plot(side * x, y)</text></svg>",
			"contributor": "1j01"
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Physics",
			"title": "Quantum waves, EM spectrum",
			"description": "The oscillation of a pendulum demonstrates classical mechanical waves.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Biology",
			"title": "Neural oscillations",
			"description": "Neurons exhibit oscillatory activity such as alpha brain waves.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Computer Science",
			"title": "Signal processing",
			"description": "A fast Fourier transform is used to analyze audio waveforms in digital signal processing.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Architecture",
			"title": "Acoustics in design",
			"description": "Suspended ceilings are designed to dampen sound wave oscillations in concert halls.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Media/Art",
			"title": "Sound design, rhythm",
			"description": "Sound designers manipulate sine and square waves to create synthesized audio.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Sociology",
			"title": "Crowd dynamics",
			"description": "Stadium chants spread as rhythmic waves through crowds.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Psychology",
			"title": "Brain rhythms",
			"description": "Exposure to rhythmic stimuli can entrain mood and attention.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Mathematics",
			"title": "Fourier analysis",
			"description": "Fourier series represent periodic functions through infinite trigonometric sums.",
			"contributor": "AI",
		},
		{
			"pattern": "Waveforms / Oscillations",
			"domain": "Engineering",
			"title": "Electrical, mechanical",
			"description": "Mechanical engineers analyze vibrational patterns in car suspension systems.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Physics",
			"title": "Thermodynamic systems",
			"description": "A thermostat uses negative feedback to regulate temperature.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Biology",
			"title": "Homeostasis",
			"description": "Hormonal regulation like insulin release is controlled by feedback loops.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Computer Science",
			"title": "Control systems, AI",
			"description": "Machine learning models adjust weights through backpropagation, a form of feedback.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Architecture",
			"title": "Responsive environments",
			"description": "Smart buildings use sensor feedback to adjust lighting and ventilation.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Media/Art",
			"title": "Narrative recursion",
			"description": "Interactive installations respond to viewer actions in real time.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Sociology",
			"title": "Social systems",
			"description": "Bureaucracies self-regulate through policy feedback mechanisms.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Psychology",
			"title": "Behavioral conditioning",
			"description": "Behavioral therapy uses feedback to reinforce desired actions.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Mathematics",
			"title": "Dynamical systems",
			"description": "Control theory models dynamic systems using feedback loops.",
			"contributor": "AI",
		},
		{
			"pattern": "Feedback Loops",
			"domain": "Engineering",
			"title": "Systems, robotics",
			"description": "Industrial systems use feedback control in process automation.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Physics",
			"title": "Particle interactions",
			"description": "Electrical circuits are modeled as networks of resistors and capacitors.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Biology",
			"title": "Neural networks",
			"description": "Neural networks in the brain transmit signals through interconnected neurons.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Computer Science",
			"title": "Graph theory, internet",
			"description": "The internet is represented as a graph of nodes and edges in routing algorithms.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Architecture",
			"title": "Circulation routes",
			"description": "Circulation paths in airports are designed using spatial network analysis.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Media/Art",
			"title": "Network aesthetics",
			"description": "Visual artists create network-based data visualizations.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Sociology",
			"title": "Social networks",
			"description": "Social network analysis maps relationships and power dynamics.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Psychology",
			"title": "Cognitive models",
			"description": "Memory retrieval is modeled as activation across associative networks.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Mathematics",
			"title": "Topology, combinatorics",
			"description": "Graph theory studies nodes and edges in mathematical structures.",
			"contributor": "AI",
		},
		{
			"pattern": "Networks / Graphs",
			"domain": "Engineering",
			"title": "Information, civil",
			"description": "Engineers use fault-tolerant networks in communications systems.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Physics",
			"title": "Chaos theory",
			"description": "Snowflakes exhibit self-similar fractal geometry at different scales.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Biology",
			"title": "Morphogenesis",
			"description": "Fern leaves replicate fractal growth patterns through cellular development.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Computer Science",
			"title": "Recursive algorithms",
			"description": "Fractal compression algorithms reduce image sizes using recursive structures.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Architecture",
			"title": "Parametric design",
			"description": "Fractal-based facade designs repeat geometric motifs at multiple levels.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Media/Art",
			"title": "Visual patterns",
			"description": "Fractal animations visualize recursive processes in generative art.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Sociology",
			"title": "Cultural memes",
			"description": "Urban sprawl shows fractal-like expansion patterns.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Psychology",
			"title": "Perceptual scaling",
			"description": "Visual perception is sensitive to self-similar patterns in natural scenes.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Mathematics",
			"title": "Fractal geometry",
			"description": "Mandelbrot sets model complex recursive geometries.",
			"contributor": "AI",
		},
		{
			"pattern": "Fractals / Self-Similarity",
			"domain": "Engineering",
			"title": "Signal compression",
			"description": "Signal engineers analyze self-similar noise in communications.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Physics",
			"title": "Harmonic oscillators",
			"description": "A bridge collapsing from synchronized footfalls shows mechanical resonance.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Biology",
			"title": "Circadian rhythms",
			"description": "Fireflies synchronize flashing in group mating displays.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Computer Science",
			"title": "Clock synchronization",
			"description": "Distributed databases use time protocols to synchronize clocks.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Architecture",
			"title": "Structural resonance",
			"description": "Auditorium acoustics are tuned to enhance vocal resonance.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Media/Art",
			"title": "Sound design",
			"description": "Musical scores build emotional impact using harmonic resonance.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Sociology",
			"title": "Collective action",
			"description": "Protest movements can synchronize actions across cities.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Psychology",
			"title": "Emotional entrainment",
			"description": "Group activities like clapping or dancing induce emotional synchrony.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Mathematics",
			"title": "Complex systems",
			"description": "Differential equations model systems reaching resonance conditions.",
			"contributor": "AI",
		},
		{
			"pattern": "Resonance / Synchronization",
			"domain": "Engineering",
			"title": "Mechanical, acoustical",
			"description": "Engineers tune engines to reduce harmful vibrational resonance.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Physics",
			"title": "Phase transitions",
			"description": "Gas particles show emergent pressure without centralized control.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Biology",
			"title": "Swarm behavior",
			"description": "Ant colonies build complex structures from simple local behaviors.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Computer Science",
			"title": "Cellular automata",
			"description": "Conway's Game of Life simulates emergent behavior from simple rules.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Architecture",
			"title": "Generative design",
			"description": "Emergent forms in parametric design result from algorithmic variation.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Media/Art",
			"title": "Emergent narrative",
			"description": "Improvisational theatre builds narrative from spontaneous interaction.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Sociology",
			"title": "Group behavior",
			"description": "Social norms emerge from repeated interactions among individuals.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Psychology",
			"title": "Intuition, gestalt",
			"description": "Gestalt psychology explains how perceptions emerge from visual inputs.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Mathematics",
			"title": "Complexity theory",
			"description": "Cellular automata show emergent complexity from local rules.",
			"contributor": "AI",
		},
		{
			"pattern": "Emergence",
			"domain": "Engineering",
			"title": "Adaptive systems",
			"description": "Swarm robotics uses simple unit behavior to achieve coordinated tasks.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Physics",
			"title": "Thermodynamics",
			"description": "Heat flow increases entropy in closed physical systems.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Biology",
			"title": "Genetic drift",
			"description": "DNA replication introduces mutations increasing genetic entropy.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Computer Science",
			"title": "Cryptography, data loss",
			"description": "Random number generators simulate entropy for encryption.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Architecture",
			"title": "Material decay",
			"description": "Time and wear introduce entropy into material building elements.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Media/Art",
			"title": "Abstract representation",
			"description": "Artists use entropy to represent decay and chaos in installations.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Sociology",
			"title": "Social chaos",
			"description": "Social unrest increases when institutions fail to manage disorder.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Psychology",
			"title": "Cognitive overload",
			"description": "High cognitive load results in reduced attention and increased error.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Mathematics",
			"title": "Information theory",
			"description": "Entropy quantifies disorder in probability distributions.",
			"contributor": "AI",
		},
		{
			"pattern": "Entropy / Disorder",
			"domain": "Engineering",
			"title": "Thermodynamic systems",
			"description": "Communication systems measure signal degradation via entropy.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Physics",
			"title": "Forces, stress",
			"description": "Trusses distribute tension and compression forces in bridges.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Biology",
			"title": "Musculoskeletal systems",
			"description": "Tendons and bones manage tensile and compressive biological loads.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Computer Science",
			"title": "Data load balancing",
			"description": "Load balancing in distributed systems reduces computational tension.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Architecture",
			"title": "Structural loads",
			"description": "Arches use compression to support structural loads.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Media/Art",
			"title": "Visual metaphor",
			"description": "Sculptors manipulate physical tension to express emotional states.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Sociology",
			"title": "Social pressure",
			"description": "Social hierarchies produce tension between classes.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Psychology",
			"title": "Mental stress",
			"description": "Chronic stress is studied as prolonged psychological tension.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Mathematics",
			"title": "Vector mechanics",
			"description": "Vectors represent compressive and tensile force directions.",
			"contributor": "AI",
		},
		{
			"pattern": "Tension / Compression",
			"domain": "Engineering",
			"title": "Civil, mechanical",
			"description": "Structural engineers model material limits under stress loads.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Physics",
			"title": "Fluid dynamics",
			"description": "Fluids in motion obey the Navier-Stokes equations.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Biology",
			"title": "Blood flow",
			"description": "Blood circulates through the body in regulated flow paths.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Computer Science",
			"title": "Data streaming",
			"description": "Streamed video data flows through network pipelines.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Architecture",
			"title": "Airflow & plumbing",
			"description": "Wind tunnels test airflow over architectural models.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Media/Art",
			"title": "Cinematic motion",
			"description": "Cinematographers use camera flow to guide viewer focus.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Sociology",
			"title": "Migration, mobility",
			"description": "Urban migration creates flows of people and resources.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Psychology",
			"title": "Stream of consciousness",
			"description": "Stream-of-consciousness writing mimics unfiltered mental flow.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Mathematics",
			"title": "Navier-Stokes equations",
			"description": "Vector fields model flow in mathematical simulations.",
			"contributor": "AI",
		},
		{
			"pattern": "Flow / Fluidity",
			"domain": "Engineering",
			"title": "Chemical, aerospace",
			"description": "Chemical engineers optimize fluid flow in reactors and pipelines.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Physics",
			"title": "Quantum barriers",
			"description": "Quantum particles reflect or tunnel based on boundary conditions.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Biology",
			"title": "Skin, membranes",
			"description": "Cell membranes act as biological boundaries controlling flow.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Computer Science",
			"title": "Interface design",
			"description": "API boundaries define access between software modules.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Architecture",
			"title": "Zoning, façade",
			"description": "Curtain walls create physical and visual architectural boundaries.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Media/Art",
			"title": "Framing in art",
			"description": "Film framing establishes narrative boundaries.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Sociology",
			"title": "Inclusion/exclusion",
			"description": "Borders define social inclusion and exclusion.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Psychology",
			"title": "Personal space",
			"description": "Personal space sets psychological boundaries in interactions.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Mathematics",
			"title": "Set theory",
			"description": "Boundary value problems determine solution constraints.",
			"contributor": "AI",
		},
		{
			"pattern": "Boundary Conditions",
			"domain": "Engineering",
			"title": "Material sciences",
			"description": "Engineers define boundary constraints in finite element models.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Physics",
			"title": "Brownian motion",
			"description": "Thermal noise affects precision in electronic circuits.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Biology",
			"title": "Genetic mutations",
			"description": "Genetic mutations arise from random biochemical events.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Computer Science",
			"title": "Randomized algorithms",
			"description": "Randomized algorithms improve efficiency in large datasets.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Architecture",
			"title": "Ambient soundscapes",
			"description": "Ambient noise levels influence spatial layout in urban design.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Media/Art",
			"title": "Glitch aesthetics",
			"description": "Glitch art embraces randomness and digital noise.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Sociology",
			"title": "Disruptive events",
			"description": "Riots represent unpredictable social noise within order.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Psychology",
			"title": "Attention fluctuation",
			"description": "Random distraction interferes with focused cognitive processes.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Mathematics",
			"title": "Probability theory",
			"description": "Stochastic models describe systems influenced by randomness.",
			"contributor": "AI",
		},
		{
			"pattern": "Noise / Randomness",
			"domain": "Engineering",
			"title": "Communications, control",
			"description": "Control engineers design filters to suppress signal noise.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Physics",
			"title": "Solid-liquid-gas",
			"description": "Water transitions from liquid to gas at boiling point.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Biology",
			"title": "Metamorphosis",
			"description": "Caterpillars undergo metamorphosis into butterflies.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Computer Science",
			"title": "Software versioning",
			"description": "Operating systems shift between modes during updates.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Architecture",
			"title": "Material transitions",
			"description": "Thermochromic materials change color with phase change.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Media/Art",
			"title": "Story arcs",
			"description": "Storylines shift tone to mark narrative transition.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Sociology",
			"title": "Social revolution",
			"description": "Revolutions signify abrupt social phase transitions.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Psychology",
			"title": "Identity shifts",
			"description": "Identity crises reflect psychological transitions.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Mathematics",
			"title": "State transitions",
			"description": "Phase transition models capture critical point behavior.",
			"contributor": "AI",
		},
		{
			"pattern": "Phase Change / Transition",
			"domain": "Engineering",
			"title": "Thermodynamics",
			"description": "Materials engineers develop alloys with specific transition points.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Physics",
			"title": "Particle physics",
			"description": "Crystals display symmetry in atomic lattice structures.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Biology",
			"title": "Organism structure",
			"description": "Bilateral symmetry is a common trait in animal morphology.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Computer Science",
			"title": "Symmetric encryption",
			"description": "Encryption keys rely on symmetric and asymmetric cryptography.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Architecture",
			"title": "Aesthetic balance",
			"description": "Symmetrical building layouts guide human movement.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Media/Art",
			"title": "Composition rules",
			"description": "Symmetry is used in visual art to imply harmony or disruption.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Sociology",
			"title": "Power relations",
			"description": "Asymmetric power relations define social stratification.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Psychology",
			"title": "Facial recognition",
			"description": "Facial asymmetry is linked to emotional expression perception.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Mathematics",
			"title": "Group theory",
			"description": "Group theory categorizes symmetrical transformations.",
			"contributor": "AI",
		},
		{
			"pattern": "Symmetry / Asymmetry",
			"domain": "Engineering",
			"title": "Structural analysis",
			"description": "Aerospace engineers design wings with controlled asymmetry.",
			"contributor": "AI",
		},
	],
};

export default data;
