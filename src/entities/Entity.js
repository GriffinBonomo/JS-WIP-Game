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
        this.position.add(this.velocity, dt);
        this.stateMachine.update(dt);
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

        for(let i = 0; i < this.dimensions.x; i += Tile.SIZE){
            for(let j = 0; j < this.dimensions.y; j += Tile.SIZE){
                //console.log(`${Math.floor((this.position.x + i) / Tile.SIZE)}, ${Math.floor((this.position.y + j) / Tile.SIZE)}`)
                let tile = this.map.collisionLayer.getTile(Math.round((this.position.x + i) / Tile.SIZE), Math.round((this.position.y + j) / Tile.SIZE));
                if(tile){
                    tiles.push(tile);
                }
            }
        }
        return tiles;
    }

    getCollisionDirection(){
        // top, bottom, left, right
        let directionCollisions = [0,0,0,0];

        // top side
        for(let i = 0; i < this.dimensions.x; i+= Tile.SIZE){
            if(this.map.collisionLayer.getTile(Math.floor((this.position.x + i) / Tile.SIZE), Math.floor((this.position.y) / Tile.SIZE))){
                console.log(`Top: ${this.position.x + i} | ${this.position.y}`)
                directionCollisions[0]++;
            }
        }
        // bottom side
        for(let i = 0; i < this.dimensions.x; i+= Tile.SIZE){
            if(this.map.collisionLayer.getTile(Math.floor((this.position.x + i) / Tile.SIZE), Math.floor((this.position.y + this.dimensions.y)) / Tile.SIZE)){
                console.log(`Bottom: ${this.position.x + i} | ${this.position.y + this.dimensions.y}`)
                directionCollisions[1]++;
            }
        }

        // left side
        for(let i = 0; i < this.dimensions.y; i+= Tile.SIZE){
            if(this.map.collisionLayer.getTile(Math.floor((this.position.x) / Tile.SIZE), Math.floor((this.position.y + i) / Tile.SIZE))){
                console.log(`Left: ${this.position.x + i} | ${this.position.y + this.dimensions.y}`)
                directionCollisions[2]++;
            }
        }

        // right side
        for(let i = 0; i < this.dimensions.y; i+= Tile.SIZE){
            if(this.map.collisionLayer.getTile(Math.floor((this.position.x + this.dimensions.x) / Tile.SIZE), Math.floor((this.position.y + i) / Tile.SIZE))){
                console.log(`Right: ${this.position.x + i} | ${this.position.y + this.dimensions.y}`)
                directionCollisions[3]++;
            }
        }
        
        console.log(directionCollisions);

        let max = 0;
        let highestIndex = 0;
        for(let i = 0; i < directionCollisions.length; i++){
            if(directionCollisions[i] > max){
                highestIndex = i;
                max = directionCollisions[i];
            }
        }

        if(max === 0)
            return null;

        switch(highestIndex){
            case 0:
                return Direction.Up;
            case 1: 
                return Direction.Down;
            case 2:
                return Direction.Left;
            case 3:
                return Direction.Right;
        }
        //return directionCollisions;
    }

    didCollideWithTiles(){
        this.getCollisionDirection();
        const tiles = this.getCollisionTiles();
        return tiles.length !== 0;
    }
}