import {
	canvas,
	context,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
} from "./globals.js";
import Player from "./player.js";
import Projectile from "./projectile.js";

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

let player = new Player(30, 30, 20, 20);

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
		player.moveHorizontal(false);
	}
	if(keys.d){
		player.moveHorizontal(true);
	}
	if(keys.w){
		player.moveVertical(false);
	}
	if(keys.s){
		player.moveVertical(true);
	}

	render();
	player.update(dt);
}


function render() {
	/**
	 * Erase whatever was previously on the canvas so that we can start
	 * fresh each frame. It does this by drawing a "clear" rectangle starting
	 * from the origin to the extremities of the canvas.
	 */
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Set font configuration.
	context.font = '40px Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
}

// Start the game loop.
gameLoop();
canvas.focus();