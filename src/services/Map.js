import Colour from "../enums/Colour.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Player from "../Entities/Player.js";
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
import HUD from "../hud.js";
import EnemyFactory from "../Entities/EnemyFactory.js";
import EnemyType from "../enums/EnemyType.js";
import GameStateName from "../enums/GameStateName.js";
import HighScore from "../utils/HighScore.js";
import { pickRandomElement, getRandomPositiveInteger } from "../../lib/RandomNumberHelpers.js";

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
		this.enemies = this.generateEnemies(2);
		this.projectiles = [];
        this.hud = new HUD(this.player, 0);

		this.score = 0;
		this.difficulty = 1;
	}

	update(dt) {
		this.player.update(dt);

		this.enemies.forEach((enemy, index) => {
			enemy.update(dt);
			if(enemy.isDead){
				this.score++;
				this.enemies.splice(index, 1);
			}
		});
		if(this.enemies.length == 0){
			this.enemies = this.generateEnemies(this.difficulty)
			this.difficulty++
		}

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
	}

	render() {
		this.bottomLayer.render();
		this.decorationsLayer.render();
		this.collisionLayer.render();

		this.enemies.forEach(enemy => {
			enemy.render();
		})
		this.projectiles.forEach(projectile => {
			projectile.render();
		})
		this.player.render();

        this.hud.render();

		if (DEBUG) {
			Map.renderGrid();
		}
	}

	generateEnemies(amount) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Enemy),
			Tile.SIZE * 2,
			Tile.SIZE * 2
		);

		const enemies = [];

		for(let i = 0; i < amount; i++){
			let enemyType = EnemyType[pickRandomElement(Object.keys(EnemyType))];

			enemies.push(EnemyFactory.createInstance(enemyType, this.getValidSpawnLocation(), new Vector(Tile.SIZE * 2, Tile.SIZE * 2), this, sprites));
		}
		return enemies;
	}

	getValidSpawnLocation() {
		let spawnLocation = new Vector(getRandomPositiveInteger(Tile.SIZE * 2, CANVAS_WIDTH - Tile.SIZE * 2), getRandomPositiveInteger(Tile.SIZE * 2, CANVAS_HEIGHT - Tile.SIZE * 2));

		while(this.collisionLayer.getTile(Math.floor(spawnLocation.x / Tile.SIZE), Math.floor(spawnLocation.y / Tile.SIZE)) != null){
			spawnLocation = new Vector(getRandomPositiveInteger(Tile.SIZE * 2, CANVAS_WIDTH - Tile.SIZE * 2), getRandomPositiveInteger(Tile.SIZE * 2, CANVAS_HEIGHT - Tile.SIZE * 2));
		}

		return spawnLocation;
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
