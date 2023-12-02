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
import Tile from "../services/Tile.js";

export default class Entity {
    constructor(position, dimensions, map) {
        this.position = position;
        this.lastValidPosition = new Vector(position.x, position.y);

        this.velocity = new Vector(0,0);

        this.dimensions = dimensions;
        this.map = map;

        this.sprites = [];

        this.stateMachine = null;
    }

    changeState(state, parameters){
        this.stateMachine.change(state, parameters);
    }

    update(dt){
        this.stateMachine.update(dt);
        this.position.add(this.velocity, dt);
        this.currentAnimation.update(dt);
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

    // Currently checks all tiles, this should eventually take a direction to save on wasted resources
    getCollisionTiles(){
        let tiles = [];

        for(let i = 0; i < this.dimensions.y; i += Tile.SIZE){
            for(let j = 0; j < this.dimensions.x; j += Tile.SIZE){
                let tile = this.map.collisionLayer.getTile(Math.round((this.position.x + j) / Tile.SIZE), Math.round((this.position.y + i) / Tile.SIZE));
                if(tile){
                    tiles.push(tile);
                }
            }
        }
        return tiles;
    }

    velocityAfterCollision(dt){
        const oldPosition = new Vector(this.position.x, this.position.y);

        // Handling horizontal collision
        this.position.add(new Vector(this.velocity.x, 0), dt);

        if(this.getCollisionTiles().length > 0){
            this.velocity.x = 0;
        }
        this.position.x = oldPosition.x;

        // Handle vertical collision
        this.position.add(new Vector(0, this.velocity.y), dt);

        if(this.getCollisionTiles().length > 0){
            this.velocity.y = 0;
        }
        this.position.y = oldPosition.y;
    }
}