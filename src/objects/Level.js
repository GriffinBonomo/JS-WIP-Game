import { images, context } from "../../globals.js";
import Tile from "./Tile.js";

export default class Level {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.tiles = this.generateTiles();
        //console.log(this.tiles);
    }

    update(dt){
        // Todo: probably do something here at some point
    }

    render() {
        //images.render("gradientBackgroundColourful", 0, 0);
        
        this.tiles.forEach(tileRow => {
            tileRow.forEach(tile => {
                tile.render();
            });
        });
        
    }

    generateTiles(){
        const tileMap = new Array();

        this.generateBackgroundTiles(tileMap);
        this.generateGroundTiles(tileMap);

        return tileMap;
    }

    generateBackgroundTiles(tileMap){
        for(let y = 0; y < this.height - 1; y++){
            tileMap.push([]);

            for(let x = 0; x < this.width; x++){
                tileMap[y].push(new Tile(x * Tile.SIZE, y * Tile.SIZE, false));
            }   
        }
    }

    generateGroundTiles(tileMap){
        for(let x = 0; x < this.width; x++){
            tileMap[this.height-2].push(new Tile(x * Tile.SIZE, (this.height-1) * Tile.SIZE, true));
        }   
    }
}