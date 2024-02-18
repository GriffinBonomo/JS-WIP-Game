import Colour from "../enums/Colour.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import ImageName from "../enums/ImageName.js";
import Tile from "./Tile.js";
import Layer from "./Layer.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	DEBUG,
	images,
	stateMachine,
} from "../../globals.js"
import HUD from "../ui/hud.js";
import GameStateName from "../enums/GameStateName.js";
import Crosshair from "../ui/Crosshair.js";
import Light from "../objects/Light.js";

export default class Map {
	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */
	constructor(mapDefinition) {
		const tileSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE,
		);

		const enemySprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Enemy),
			Tile.SIZE * 2,
			Tile.SIZE * 2,
		);

		this.bottomLayer = new Layer(mapDefinition.layers[Layer.BOTTOM], tileSprites);
		this.decorationsLayer = new Layer(mapDefinition.layers[Layer.DECORATIONS], tileSprites);
		this.collisionLayer = new Layer(mapDefinition.layers[Layer.COLLISION], tileSprites);
		this.player = new Player(new Vector(200,80), new Vector(Player.SPRITE_WIDTH, Player.SPRITE_HEIGHT), this);
		this.projectiles = [];

		// Move this out of the map
        this.hud = new HUD(this.player, 1);
		this.crosshair = new Crosshair();

		this.lights = [];
		this.lights.push(new Light(new Vector(272, 260), this));
		this.lights.push(new Light(new Vector(412, 236), this, { coneWidth: 90 }));
		this.lights.push(new Light(new Vector(148, 236), this, { coneWidth: 90 }));
		this.lights.push(new Light(new Vector(584, 280), this, { rayLength:100, colour: '#E4D891'}));
	}

	rayCast(ray){
		const rayStepSize = new Vector(Math.sqrt(1 + Math.pow(ray.direction.y / ray.direction.x, 2)), Math.sqrt(1 + Math.pow(ray.direction.x / ray.direction.y, 2)));
        let currentPosition = new Vector(ray.position.x, ray.position.y);

        let currentRayLength = new Vector(); // Length from current position to nearest boundary
        let step = new Vector(Math.sign(ray.direction.x), Math.sign(ray.direction.y));
        if(ray.direction.x < 0){
            currentRayLength.x = (ray.position.x - currentPosition.x) * rayStepSize.x;
        }
        else {
            currentRayLength.x = (currentPosition.x + 1 - ray.position.x) * rayStepSize.x;
        }
        if(ray.direction.y < 0){
            currentRayLength.y = (ray.position.y - currentPosition.y) * rayStepSize.y;
        }
        else {
            currentRayLength.y = (currentPosition.y + 1 - ray.position.y) * rayStepSize.y;
        }

        let currentDistance = 0;
		let didCollide = false;
        while(!didCollide && currentDistance < ray.length){
            if(currentRayLength.x < currentRayLength.y){
                currentPosition.x += step.x;
                currentDistance = currentRayLength.x;
                currentRayLength.x += rayStepSize.x;
            }
            else{
                currentPosition.y += step.y;
                currentDistance = currentRayLength.y;
                currentRayLength.y += rayStepSize.y;
            }
            if(this.collisionLayer.getTileAtPosition(currentPosition.x, currentPosition.y)){
                didCollide = true;
                break;
            }
        }
        return new Vector(currentPosition.x, currentPosition.y);
	}

	update(dt) {
		this.player.update(dt);

		this.projectiles.forEach((projectile, index) => {
			projectile.update(dt);
			if(projectile.isDead){
				this.projectiles.splice(index, 1);
			}
		}) 

		if(this.player.isDead){
			HighScore.setScore(this.score);
			stateMachine.change(GameStateName.GameOver);
		}

        this.hud.update(dt);
		this.crosshair.update(dt);


		// REMOVE THIS LATER
		this.lights.forEach(light => {
			light.update(dt);
		})
	}

	render() {
		this.bottomLayer.render();
		this.decorationsLayer.render();

		// DRAWING DARKNESS
		context.save();
		context.fillStyle = 'black';
		context.globalCompositeOperation = "multiply";
		context.globalAlpha = 0.5;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.restore();

		this.projectiles.forEach(projectile => {
			projectile.render();
		})
		this.player.render();
		
		// REMOVE THIS LATER
		this.lights.forEach(light => {
			light.render();
		});

		this.collisionLayer.render();

        this.hud.render();
		this.crosshair.render();

		if (DEBUG) {
			Map.renderGrid();
		}
	}

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = Colour.White;

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}
		context.restore();
	}
}
