import { images, context } from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Tile from "./Tile.js";
import Tilemap from "./Tilemap.js";
import { getTileById } from "../helpers/leveHelper.js";

export default class Level {
    constructor(height, width, mapData) {
        this.tileMap = new Tilemap(height, width, this.generateTiles(mapData));
    }

    update(dt){
        // Todo: probably do something here at some point
    }

    render() {
        this.tileMap.render();
        /*
        this.tiles.forEach(tileRow => {
            tileRow.forEach(tile => {
                tile.render();
            });
        });
        */
    }

    generateTiles(mapData){
        const tileMap = new Array();

        for(let y = 0; y < mapData.length; y++){
            tileMap.push([]);

            for(let x = 0; x < mapData[0].length; x++){
                tileMap[y].push(getTileById(mapData[y][x], new Vector(x * Tile.SIZE, y * Tile.SIZE)));
            }   
        }

        return tileMap;
    }
}