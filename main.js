import Player from "./player.js";


const canvas = document.createElement('canvas');
const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

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
	render();

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

	player.update(dt);

	// Teleport to other side of map
	if(player.x + player.width < 0){
		player.x = CANVAS_WIDTH;
	}
	else if(player.x > CANVAS_WIDTH){
		player.x = 0;
	}
	
	if(player.y > CANVAS_HEIGHT){
		player.y = 0;
	}
	else if(player.y + player.height < 0){
		player.y = CANVAS_HEIGHT;
	}
}


function render() {
	/**
	 * Erase whatever was previously on the canvas so that we can start
	 * fresh each frame. It does this by drawing a "clear" rectangle starting
	 * from the origin to the extremities of the canvas.
	 */
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	context.fillStyle = "green";
	context.fillRect(player.x, player.y, player.width, player.height);

	// Set font configuration.
	context.font = '40px Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';

	context.fillStyle = "black";
	context.fillText(`DX: ${player.dx}`, 100, 80);
	context.fillText(`DY: ${player.dy}`, 100, 150)

}

// Start the game loop.
gameLoop();
canvas.focus();