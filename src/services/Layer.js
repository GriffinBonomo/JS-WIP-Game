import Tile from "./Tile.js";

export default class Layer {
	static BOTTOM = 0;
	static DECORATIONS = 1;
	static COLLISION = 2;
	static TOPPERS = 3;

	/**
	 * A collection of tiles that comprises
	 * one layer of the map. The tiles are stored
	 * in a 1D array instead of a 2D array to make
	 * accessing an individual tile more efficient
	 * when the layers are thousands of tiles long.
	 *
	 * @param {object} layerDefinition
	 * @param {array} sprites
	 */
	constructor(layerDefinition, sprites) {
		this.tiles = Layer.generateTiles(layerDefinition.data, sprites);
		this.width = layerDefinition.width;
		this.height = layerDefinition.height;
	}

	render() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.getTile(x, y)?.render(x, y);
			}
		}
	}

	/**
	 * The Y coordinate is multiplied by the map width
	 * to get us to the correct row, then the X coordinate
	 * is added to get us to the correct column in that row.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @returns The Tile that lives at (x, y) in the layer.
	 */
	getTile(x, y) {
		return this.tiles[x + y * this.width];
	}

	/**
	 * Converts a position into the corresponding tile coordinate overlapping that point
	 * and retrieves the tile at that point.
	 * @param {*} x The x coordinate of the position.
	 * @param {*} y The y coordinate of the position.
	 * @returns The tile that overlaps the provided position.
	 */
	getTileAtPosition(x, y){
		return this.getTile(Math.trunc(x / Tile.SIZE), Math.trunc(y / Tile.SIZE));
	}

	/**
	 * @param {object} layerData The exported layer data from Tiled.
	 * @param {array} sprites
	 * @returns An array of Tile objects.
	 */
	static generateTiles(layerData, sprites) {
		const tiles = [];

		layerData.forEach((tileId) => {
			// Tiled exports tile data starting from 1 and not 0, so we must adjust it.
			tileId--;

			// -1 means there should be no tile at this location.
			const tile = tileId === -1 ? null : new Tile(tileId, sprites);

			tiles.push(tile);
		});

		return tiles;
	}
}
