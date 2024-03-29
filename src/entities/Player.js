import {
    images,
    keys,
    mouse,
} from "../../globals.js"
import Vector from "../../lib/Vector.js";
import Sprite from "../../lib/Sprite.js";
import Direction from "../enums/Directions.js";
import Entity from "./Entity.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerStateName from "../enums/PlayerStateNames.js";
import PlayerIdleState from "../states/player/PlayerIdleState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import ImageName from "../enums/ImageName.js";
import RangedWeapon from "../items/RangedWeapon.js";
import Hitbox from "../../lib/Hitbox.js";
import PlayerFallingState from "../states/player/PlayerFallingState.js";
import PlayerJumpingState from "../states/player/PlayerJumpingState.js";

export default class Player extends Entity{
    static SPRITE_WIDTH = 32;
    static SPRITE_HEIGHT = 32;

    static MAX_FALLING_SPEED = 150;
    static GRAVITY = 300;

    constructor(position, dimensions, map){
        super(position, dimensions, map, 
        {
            damageCooldownLength: 0.5,
            hitboxOffsets: new Hitbox(12, 3, -24, -4)
        });

        this.map = map;

        // Stats 
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
        this.stateMachine.add(PlayerStateName.Falling, new PlayerFallingState(this));
        this.stateMachine.add(PlayerStateName.Jumping, new PlayerJumpingState(this));
        this.stateMachine.change(PlayerStateName.Idle);
    }

    generateSprites() {
        const sprites = [];

        for(let i = 0; i < this.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get(ImageName.Gunslinger),
				i * Player.SPRITE_WIDTH,
				0,
				Player.SPRITE_WIDTH,
				Player.SPRITE_HEIGHT,
			));
        }
        return sprites;
    }

    move(direction){
        switch(direction){
            case Direction.Left:
                this.velocity.x = Math.max(-this.maxSpeed, (this.velocity.x-this.groundAcceleration) * this.movementModifier);
                this.direction = direction;
                break;
            case Direction.Right:
                this.velocity.x = Math.min(this.maxSpeed, (this.velocity.x+this.groundAcceleration) * this.movementModifier);
                this.direction = direction;
                break;
        }
    }

    applyFriction(){
        let frictionCoefficient = 0.8;

        this.velocity.x = Math.trunc(this.velocity.x * frictionCoefficient);
        this.velocity.y = Math.trunc(this.velocity.y * frictionCoefficient);
    }

    applyGravity(dt){
        this.velocity.add(new Vector(0, Player.GRAVITY), dt);

        if(this.velocity.y > Player.MAX_FALLING_SPEED){
            this.velocity.y = Player.MAX_FALLING_SPEED;
        }
    }

    update(dt){
        this.weapon.update(dt);

        super.update(dt);
    }

    render(){
        super.render();
        this.weapon.render();
    }
}