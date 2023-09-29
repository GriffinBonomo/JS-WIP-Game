import {
	canvas,
	context,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	images,
} from "./globals.js";
import HUD from "./src/hud.js";
import Level from "./src/level.js";
import Player from "./src/player.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1');

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

let keys = {};

canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});


// Fetching all assets
const {
	images: imageDefinitions,
} = await fetch('./config.json').then((response) => response.json());
images.load(imageDefinitions);


let player = new Player(200, 200, 32, 32);
let level = new Level();
let hud = new HUD(player, 1);



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
	level.update(dt);
	player.update(dt);
	hud.update(dt);
}


function render() {
	/**
	 * Erase whatever was previously on the canvas so that we can start
	 * fresh each frame. It does this by drawing a "clear" rectangle starting
	 * from the origin to the extremities of the canvas.
	 */
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Set font configuration.
	context.font = '24px Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
}

// Start the game loop.
gameLoop();
canvas.focus();