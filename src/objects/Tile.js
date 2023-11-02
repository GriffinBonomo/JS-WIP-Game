import {
    images,
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} from "../../globals.js";
import Sprite from "../../lib/Sprite.js";

export default class Tile {
    static SIZE = 16;

    constructor(x, y, isCollidable = false) {
        this.x = x;
        this.y = y;
        this.isCollidable = isCollidable;

        this.TOTAL_SPRITES = 1;

        this.sprite = this.generateRandomTileSprite();
    }

    generateRandomTileSprite(){
        const sprites = [];

        // Ugly P.O.S testing feature to allow me to change between ground and grass
        let spriteOffset = this.isCollidable? 16: 0;

        for(let i = 0; i < this.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get("tiles"),
                i * Tile.SIZE,
				spriteOffset,
				Tile.SIZE,
				Tile.SIZE,
			));
        }  
        return sprites[Math.floor(Math.random() * sprites.length)];  
    }
    
    render(){
        this.sprite.render(this.x, this.y);
    }
}