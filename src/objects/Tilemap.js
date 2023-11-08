import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../globals.js";
import Tile from "./Tile.js";

export default class Tilemap {
    constructor(height, width, tiles){
        this.height = height;
        this.width = width;
        this.tiles = tiles;
    }

    update(dt){

    }

    render() {
        this.tiles.forEach((tileRow) => {
            tileRow.forEach((tile) => {
                tile.render()
            });
        });
    }

    pointToTile(x, y){
        if (x < 0 || 
            x > CANVAS_WIDTH ||
            y < 0 || 
            y > CANVAS_HEIGHT){
            return null
        }

        return this.tiles[Math.floor(y / Tile.SIZE)][Math.floor(x / Tile.SIZE)];
    }
}