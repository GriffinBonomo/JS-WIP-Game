import { mouse, context, images } from "../../globals.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import Sprite from "../../lib/Sprite.js";

export default class Crosshair {
    constructor(){
        this.TOTAL_SPRITES = 1;
        this.dimensions = new Vector(10, 10);
        this.position = new Vector(0, 0);
        this.sprites = this.generateSprites();
    }

    generateSprites() {
        const sprites = [];

        for(let i = 0; i < this.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get(ImageName.Crosshair),
				i * this.dimensions.x,
				0,
				this.dimensions.x,
				this.dimensions.y,
			));
        }
        return sprites;
    }

    update(){
        this.position.x = mouse.position.x - this.dimensions.x / 2;
        this.position.y = mouse.position.y - this.dimensions.y / 2;
    }

    render(){
        this.sprites[0].render(Math.round(this.position.x), Math.round(this.position.y));
    }
}