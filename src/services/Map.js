import Colour from "../enums/Colour.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import ImageName from "../enums/ImageName.js";
import Tile from "./Tile.js";
import Layer from "./Layer.js";
import {
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

export default class Map {
	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */
	constructor(mapDefinition) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE,
		);
		this.bottomLayer = new Layer(mapDefinition.layers[Layer.BOTTOM], sprites);
		this.decorationsLayer = new Layer(mapDefinition.layers[Layer.DECORATIONS], sprites);
		this.collisionLayer = new Layer(mapDefinition.layers[Layer.COLLISION], sprites);
		this.player = new Player(new Vector(200,80), new Vector(Player.SPRITE_WIDTH, Player.SPRITE_HEIGHT), this);
		this.projectiles = [];

		// Move this out of the map
        this.hud = new HUD(this.player, 1);
		this.crosshair = new Crosshair();

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
	}

	render() {
		this.bottomLayer.render();
		this.collisionLayer.render();
		this.decorationsLayer.render();

		this.projectiles.forEach(projectile => {
			projectile.render();
		})
		this.player.render();

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
