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

        this.stateMachine = null;
    }

    changeState(state, parameters){
        this.stateMachine.change(state, parameters);
    }

    update(dt){
        this.stateMachine.update(dt);
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

    getTilesByDirection(directions){
        let firstTile = this.level.tileMap.pointToTile(this.position.x, this.position.y);

        let tiles = [];
        let offset = 0;

        directions.forEach(direction => {
            switch(direction){
                case Direction.Left:
                    offset = 0;
                    break;
                case Direction.Up:
                    offset = 0;
                    break;
                case Direction.Right:
                    offset = this.dimensions.x;
                    break;
                case Direction.Down:
                    offset = this.dimensions.y;
                    break;
            }
    
            if(direction == Direction.Left || direction == Direction.Right){
                for(let i = firstTile.position.y; i <= this.position.y + this.dimensions.y; i += Tile.SIZE){
                    tiles.push(this.level.tileMap.pointToTile(firstTile.position.x + offset, i));
                }
            }
            else if(direction == Direction.Up || direction == Direction.Down){
                for(let i = firstTile.position.y; i <= this.position.y + this.dimensions.y; i += Tile.SIZE){
                    tiles.push(this.level.tileMap.pointToTile(i, firstTile.position.y + offset));
                }
            }
        });
        return tiles;
    }

    getCollisionTilesByDirection(directions){
        const tiles = this.getTilesByDirection(directions);

        let collidableTiles = tiles.filter(tile => tile?.isCollidable);
        return collidableTiles
    }
    didCollideWithTiles(directions){
        const tiles = this.getCollisionTilesByDirection(directions);
        return tiles.length !== 0;
    }
}