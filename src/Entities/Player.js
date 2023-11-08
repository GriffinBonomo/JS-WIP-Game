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

export default class Player {
    constructor(position, dimensions, level){
        this.position = position;
        this.dimensions = dimensions;
        this.level = level;

        this.velocity = new Vector(0,0);

        // Acceleration 
        this.ddx = 0;
        this.ddy = 0;

        // Limits
        this.groundAcceleration = 100;
        this.maxSpeed = 500;

        // Abilities
        this.projectiles = [];

        // Sprites
        // Change this to static later maybe
        this.currentAnimation = new Animation([0,1,2,1], 0.3);
        this.TOTAL_SPRITES = 4;
        this.sprites = this.generateSprites();
    }

    generateSprites() {
        const sprites = [];

        for(let i = 0; i < this.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get("character"),
				i * this.dimensions.x,
				0,
				this.dimensions.x,
				this.dimensions.y,
			));
        }
        return sprites;
    }

    moveForward(){
        this.velocity.x = Math.min(this.maxSpeed, this.velocity.x+this.groundAcceleration);
    }
    moveBackward(){
        this.velocity.x = Math.max(-this.maxSpeed, this.velocity.x-this.groundAcceleration);
    }
    moveUpward(){
        this.velocity.y = Math.max(-this.maxSpeed, this.velocity.y-this.groundAcceleration);
    }
    moveDownward(){
        this.velocity.y = Math.min(this.maxSpeed, this.velocity.y+this.groundAcceleration);
    }

    shootProjectile(shootDirection){
        let speed = 300; // Change this later

        switch(shootDirection){
            case Direction.Left:
                this.projectiles.push(new Projectile(new Vector(this.position.x, this.position.y), new Vector(-speed, 0)));
                break;
            case Direction.Right:
                this.projectiles.push(new Projectile(new Vector(this.position.x, this.position.y), new Vector(speed, 0)));
                break;
            case Direction.Up:
                this.projectiles.push(new Projectile(new Vector(this.position.x, this.position.y), new Vector(0, -speed)));
                break;
            case Direction.Down:
                this.projectiles.push(new Projectile(new Vector(this.position.x, this.position.y), new Vector(0, speed)));
                break;
        }
    }


    collision(){
        if(this.didCollideWithTiles([Direction.Left])){
            console.log("Collision");
            this.velocity = new Vector(0,0);
        }
    }

    getTilesByDirection(directions){
        let firstTile = this.level.tileMap.pointToTile(this.position.x, this.position.y);

        let tiles = [];
        let offset = 0;

        directions.forEach(direction => {
            switch(direction){
                case Direction.Left:
                    offset = -Tile.SIZE;
                    break;
                case Direction.Up:
                    offset = -Tile.SIZE;
                    break;
                case Direction.Right:
                    offset = (this.position.x + this.dimensions.x);
                    break;
                case Direction.Down:
                    offset = (this.position.y + this.dimensions.y);
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
        })
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

    applyFriction(){
        let frictionCoefficient = 0.85;

        this.velocity.x = Math.trunc(this.velocity.x * frictionCoefficient);
        this.velocity.y = Math.trunc(this.velocity.y * frictionCoefficient);
    }

    update(dt){
        // MOVING
        if(keys.a){
            this.moveBackward();
        }
        if(keys.d){
            this.moveForward();
        }
        if(keys.w){
            this.moveUpward();
        }
        if(keys.s){
            this.moveDownward();
        }
        
        // SHOOTING
        if(keys.ArrowUp){
            keys.ArrowUp = false;
            this.shootProjectile(Direction.Up);
        }
        if(keys.ArrowDown){
            keys.ArrowDown = false;
            this.shootProjectile(Direction.Down);
        }
        if(keys.ArrowLeft){
            keys.ArrowLeft = false;
            this.shootProjectile(Direction.Left);
        }
        if(keys.ArrowRight){
            keys.ArrowRight = false;
            this.shootProjectile(Direction.Right);
        }
        this.position.add(this.velocity, dt);

        this.collision();
        this.applyFriction();


        

        this.projectiles.forEach(projectile => {
            projectile.update(dt);
        });

        this.currentAnimation.update(dt);
    }

    render(){
        /*
        if(this.dx > 0){
            this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.x), Math.floor(this.y));
        }
        else if(this.dx < 0){
            context.save();
			context.translate(Math.floor(this.x) + this.width, Math.floor(this.y));
			context.scale(-1, 1);
			this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
			context.restore();
        } 
        else{
            this.sprites[0].
        }
        */
        this.projectiles.forEach(projectile => {
            projectile.render();
        });

        this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.position.x), Math.floor(this.position.y));

    }
}