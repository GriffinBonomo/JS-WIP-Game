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
import Entity from "./Entity.js";

export default class Player extends Entity{
    constructor(position, dimensions, level){
        super(position, dimensions, level);

        // Acceleration 
        this.ddx = 0;
        this.ddy = 0;

        // Limits
        this.groundAcceleration = 100;
        this.maxSpeed = 300;

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
        if(this.didCollideWithTiles([Direction.Right, Direction.Up, Direction.Left, Direction.Down])){
            this.velocity = new Vector(0,0);
            this.position.x = this.lastValidPosition.x;
            this.position.y = this.lastValidPosition.y;          
        }
        else{
            this.lastValidPosition.x = this.position.x;
            this.lastValidPosition.y = this.position.y;
        }
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

        this.collision();

        this.applyFriction();

        this.projectiles.forEach(projectile => {
            projectile.update(dt);
        });

        super.update(dt);
    }

    render(){
        this.projectiles.forEach(projectile => {
            projectile.render();
        });

        super.render();
    }
}