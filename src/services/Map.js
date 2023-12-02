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
} from "../../globals.js"
import HUD from "../hud.js";

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
		this.player = new Player(new Vector(200,200), new Vector(Tile.SIZE * 2, Tile.SIZE * 2), this);
        this.hud = new HUD(this.player, 1);
	}

	update(dt) {
		this.player.update(dt);
        this.hud.update(dt);
	}

	render() {
		this.bottomLayer.render();
		this.decorationsLayer.render();
		this.collisionLayer.render();
		this.player.render();
        this.hud.render();

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
