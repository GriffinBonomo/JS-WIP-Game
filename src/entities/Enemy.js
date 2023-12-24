import Vector from "../../lib/Vector.js";
import Direction from "../enums/Directions.js";
import Entity from "./Entity.js";
import HealthBar from "../ui/HealthBar.js";

export default class Enemy extends Entity {
    constructor(position, dimensions, map, sprites){
        super(position, dimensions, new Vector(0,0), map);

        this.map = map;

        // Acceleration 
        this.ddx = 0;
        this.ddy = 0;

        // Limits
        this.groundAcceleration = 70;
        this.maxSpeed = 100;

        // Stats
        this.detectionRange = 10;
        this.damage = 10;

        // Abilities

        //this.currentAnimation;
        this.sprites = sprites;

        // UI
        this.healthBar = new HealthBar(this, HealthBar.ENEMY_BAR_DIMENSIONS);
    }

    move(direction){
        switch(direction){
            case Direction.Up:
                this.velocity.y = Math.max(-this.maxSpeed, this.velocity.y-this.groundAcceleration);
                break;
            case Direction.Down:
                this.velocity.y = Math.min(this.maxSpeed, this.velocity.y+this.groundAcceleration);
                break;
            case Direction.Left:
                this.velocity.x = Math.max(-this.maxSpeed, this.velocity.x-this.groundAcceleration);
                break;
            case Direction.Right:
                this.velocity.x = Math.min(this.maxSpeed, this.velocity.x+this.groundAcceleration);
                break;
        }
    }

    applyFriction(){
        let frictionCoefficient = 0.8;

        this.velocity.x = Math.trunc(this.velocity.x * frictionCoefficient);
        this.velocity.y = Math.trunc(this.velocity.y * frictionCoefficient);
    }

    getPlayerDistance(){
        let dx = this.position.x - this.map.player.position.x;
        let dy = this.position.y - this.map.player.position.y;

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    update(dt){
        this.healthBar.update(dt);

        super.update(dt);
    }

    render(){
        this.healthBar.render();

        super.render();
    }
}