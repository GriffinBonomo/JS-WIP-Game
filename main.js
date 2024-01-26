import GameStateName from "./src/enums/GameStateName.js";
import Game from "./lib/Game.js";
import {
	canvas,
	context,
	fonts,
	images,
	sounds,
	keys,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	stateMachine,
	mouse,
} from "./globals.js";
import PlayState from "./src/states/PlayState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1');
canvas.setAttribute('oncontextmenu', 'return false');

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetching all assets
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions
} = await fetch('./config.json').then((response) => response.json());
const mapDefinition = await fetch(`src/maps/level0.json`).then((response) => response.json());

// Load Assets
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Listening for user input
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

mouse.enable();

stateMachine.add(GameStateName.Play, new PlayState(mapDefinition));

const game = new Game(stateMachine, context, CANVAS_WIDTH, CANVAS_HEIGHT);

stateMachine.change(GameStateName.Play);

game.start();

canvas.focus();
