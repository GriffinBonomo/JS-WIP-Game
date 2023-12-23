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
} from "./globals.js";
import PlayState from "./src/states/PlayState.js";
import HUD from "./src/hud.js";
import Player from "./src/Entities/Player.js";
import Tile from "./src/services/Tile.js";
import Vector from "./lib/Vector.js";
import TitleScreenState from "./src/states/TitleScreenState.js";
import GameOverState from "./src/states/GameOverState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1');

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
sounds.load(soundDefinitions)

// Listening for user input
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

stateMachine.add(GameStateName.Play, new PlayState(mapDefinition));
stateMachine.add(GameStateName.Title, new TitleScreenState());
stateMachine.add(GameStateName.GameOver, new GameOverState());

const game = new Game(stateMachine, context, CANVAS_WIDTH, CANVAS_HEIGHT);

stateMachine.change(GameStateName.Title);

game.start();

canvas.focus();
