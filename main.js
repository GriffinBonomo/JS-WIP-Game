import GameStateName from "./src/enums/GameStateNames.js";
import Game from "./lib/Game.js";
import {
	canvas,
	context,
	fonts,
	images,
	keys,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	stateMachine,
} from "./globals.js";
import PlayState from "./src/states/PlayState.js";
import HUD from "./src/hud.js";
import Level from "./src/objects/Level.js";
import Player from "./src/entities/Player.js";
import Tile from "./src/services/Tile.js";
import Vector from "./lib/Vector.js";

import level0 from "./src/maps/level0.js";

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
} = await fetch('./config.json').then((response) => response.json());

// Load Assets
images.load(imageDefinitions);
fonts.load(fontDefinitions);

// Listening for user input
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

stateMachine.add(GameStateName.Play, new PlayState());

const game = new Game(stateMachine, context, canvas.width, canvas.height);

let level = new Level(30, 50, level0);
let player = new Player(new Vector(200,200), new Vector(Tile.SIZE * 2, Tile.SIZE * 2), level);
let hud = new HUD(player, 1);

stateMachine.change(GameStateName.Play, {
	player: player,
	level: level,
	hud: hud,
});

game.start();

canvas.focus();
