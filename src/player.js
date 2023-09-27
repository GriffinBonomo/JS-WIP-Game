import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} from "../globals.js"
import Projectile from "./projectile.js";

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

        // Dev
        this.debug = 1;
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

    shootProjectile(){
        this.projectiles.push(new Projectile(this.x, this.y, this.dx, this.dy));
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
        this.x += this.dx * dt;
        this.y += this.dy * dt;

        this.applyFriction();
        this.collision();

        this.projectiles.forEach(projectile => {
            projectile.update(dt);
        });

        this.render();
    }

    render(){
        context.fillStyle = "green";
        context.fillRect(this.x, this.y, this.width, this.height);

        if(this.debug == 1){
            context.fillStyle = "black";
            context.fillText(`DX: ${this.dx}`, 100, 80);
            context.fillText(`DY: ${this.dy}`, 100, 150);
        }
    }
}