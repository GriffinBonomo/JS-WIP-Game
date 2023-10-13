import {
    canvas,
    context,
    images,
    keys,
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} from "../../globals.js"
import Projectile from "./Projectile.js";
import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import Direction from "../enums/Directions.js";

export default class Player {
    constructor(x, y, height, width){
        // Position
        this.x = x;
        this.y = y;

        // Velocity
        this.dx = 0;
        this.dy = 0;

        // Acceleration 
        this.ddx = 0;
        this.ddy = 0;

        // Dimensions
        this.height = height;
        this.width = width;

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
				i * this.width,
				0,
				this.width,
				this.height,
			));
        }
        return sprites;
    }

    moveForward(){
        this.dx = Math.min(this.maxSpeed, this.dx+this.groundAcceleration);
    }
    moveBackward(){
        this.dx = Math.max(-this.maxSpeed, this.dx-this.groundAcceleration);
    }

    moveUpward(){
        this.dy = Math.max(-this.maxSpeed, this.dy-this.groundAcceleration);
    }
    moveDownward(){
        this.dy = Math.min(this.maxSpeed, this.dy+this.groundAcceleration);
    }

    shootProjectile(shootDirection){
        let speed = 300; // Change this later

        switch(shootDirection){
            case Direction.Left:
                this.projectiles.push(new Projectile(this.x, this.y, -speed, 0));
                break;
            case Direction.Right:
                this.projectiles.push(new Projectile(this.x, this.y, speed, 0));
                break;
            case Direction.Up:
                this.projectiles.push(new Projectile(this.x, this.y, 0, -speed));
                break;
            case Direction.Down:
                this.projectiles.push(new Projectile(this.x, this.y, 0, speed));
        }
    }


    collision(){
        // Teleport to other side of map
        if(this.x + this.width < 0){
            this.x = CANVAS_WIDTH;
        }
        else if(this.x > CANVAS_WIDTH){
            this.x = 0;
        }
        
        if(this.y > CANVAS_HEIGHT){
            this.y = 0;
        }
        else if(this.y + this.height < 0){
            this.y = CANVAS_HEIGHT;
        }
    }

    applyFriction(){
        let frictionCoefficient = 0.85;

        this.dx = Math.trunc(this.dx * frictionCoefficient);
        this.dy = Math.trunc(this.dy * frictionCoefficient);
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

        this.x += this.dx * dt;
        this.y += this.dy * dt;

        this.applyFriction();
        this.collision();

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

        this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.x), Math.floor(this.y));

    }
}