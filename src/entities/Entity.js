import {
    canvas,
    context,
    images,
    keys,
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} from "../../globals.js"

import Vector from "../../lib/Vector.js";
import Projectile from "./Projectile.js";
import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import Direction from "../enums/Directions.js";
import Tile from "../objects/Tile.js";

export default class Entity {
    constructor(position, dimensions, level) {
        this.position = position;
        this.lastValidPosition = new Vector(position.x, position.y);

        this.velocity = new Vector(0,0);

        this.dimensions = dimensions;
        this.level = level;

        this.sprites = [];
    }

    update(dt){
        this.currentAnimation.update(dt);
        this.position.add(this.velocity, dt);
    }

    render(){
        if(this.velocity.x >= 0){
            this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.position.x), Math.floor(this.position.y));
        }
        else{
            context.save();
			context.translate(Math.floor(this.position.x) + this.dimensions.x, Math.floor(this.position.y));
			context.scale(-1, 1);
			this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
			context.restore();
        }
    }
}