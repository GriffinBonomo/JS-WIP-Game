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
import Player from "./src/Entities/Player.js";

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

let player = new Player(200, 200, 32, 32);
let level = new Level();
let hud = new HUD(player, 1);

stateMachine.change(GameStateName.Play, {
	player: player,
	level: level,
	hud: hud,
});

game.start();

canvas.focus();

/*
// This will be used to calculate delta time in `gameLoop()`.
let lastTime = 0;

function gameLoop(currentTime = 0) {
	const deltaTime = (currentTime - lastTime) / 1000;

	update(deltaTime);
	lastTime = currentTime;
	requestAnimationFrame(gameLoop);
}


function update(dt) {
	if(keys.a){
		player.moveBackward();
	}
	if(keys.d){
		player.moveForward();
	}
	if(keys.w){
		player.moveUpward();
	}
	if(keys.s){
		player.moveDownward();
	}
	
	if(keys[' ']){
		keys[' '] = false;
		player.shootProjectile();
	}

	render();
	//level.update(dt);
	//player.update(dt);
	//hud.update(dt);
}


function render() {

	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Set font configuration.
	context.font = '24px Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
}

// Start the game loop.
gameLoop();
canvas.focus();
*/