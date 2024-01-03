import {
    images,
    keys,
} from "../../globals.js"
import Vector from "../../lib/Vector.js";
import Animation from "../../lib/Animation.js";
import Sprite from "../../lib/Sprite.js";
import Direction from "../enums/Directions.js";
import Entity from "./Entity.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerStateName from "../enums/PlayerStateNames.js";
import PlayerIdleState from "../states/player/PlayerIdleState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import ImageName from "../enums/ImageName.js";
import HealthBar from "../ui/HealthBar.js";
import RangedWeapon from "../objects/RangedWeapon.js";

export default class Player extends Entity{
    constructor(position, dimensions, map){
        super(position, dimensions, new Vector(0,0), map, 
        {
            damageCooldownLength: 0.5
        });

        this.map = map;

        // Stats 
        this.ddx = 0;
        this.ddy = 0;

        this.groundAcceleration = 40;
        this.maxSpeed = 80;

        // Items
        this.weapon = new RangedWeapon(this);

        // Sprites
        this.currentAnimation;
        this.TOTAL_SPRITES = 32;
        this.sprites = this.generateSprites();

        // States
        this.stateMachine = new StateMachine();
        this.stateMachine.add(PlayerStateName.Idle, new PlayerIdleState(this));
        this.stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
        this.stateMachine.change(PlayerStateName.Idle);

        // UI
        this.healthBar = new HealthBar(this, HealthBar.PLAYER_BAR_DIMENSIONS);
    }

    generateSprites() {
        const sprites = [];

        for(let i = 0; i < this.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get(ImageName.Gunslinger),
				i * this.dimensions.x,
				0,
				this.dimensions.x,
				this.dimensions.y,
			));
        }
        return sprites;
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

    update(dt){
        // Attacking
        if(keys.ArrowUp){
            this.weapon.shoot(Direction.Up)
        }
        if(keys.ArrowDown){
            this.weapon.shoot(Direction.Down);
        }
        if(keys.ArrowLeft){
            this.weapon.shoot(Direction.Left);
        }
        if(keys.ArrowRight){
            this.weapon.shoot(Direction.Right);
        }

        this.healthBar.update(dt);
        this.weapon.update(dt);

        super.update(dt);    
    }

    render(){
        this.healthBar.render();

        super.render();
    }
}