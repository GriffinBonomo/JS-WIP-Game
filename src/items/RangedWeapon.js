import Vector from "../../lib/Vector.js";
import Projectile from "../entities/Projectile.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { context, images, mouse } from "../../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import WeaponHolsteredState from "../states/weapon/WeaponHolsteredState.js";
import WeaponStateName from "../enums/WeaponStateName.js";
import WeaponAimingState from "../states/weapon/WeaponAimingState.js";

export default class RangedWeapon {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 8;
    static TOTAL_SPRITES = 24

    constructor(owner, options = {}){
        this.owner = owner;
        this.position = new Vector(0,0);
        this.dimensions = new Vector(RangedWeapon.SPRITE_WIDTH, RangedWeapon.SPRITE_HEIGHT);

        this.shotDelay = 1 / (options.fireRate ?? 5);
        this.shotSpeed = options.shotSpeed ?? 500;

        this.shotDelayRemaining = 0;

        this.sprites = this.generateSprites();

        this.stateMachine = new StateMachine();
        this.stateMachine.add(WeaponStateName.Holstered, new WeaponHolsteredState(this, this.sprites[0]));
        this.stateMachine.add(WeaponStateName.Aiming, new WeaponAimingState(this, this.sprites[0]));
        this.stateMachine.change(WeaponStateName.Holstered);
    }
    
    generateSprites() {
        const sprites = [];

        for(let i = 0; i < RangedWeapon.TOTAL_SPRITES; i++){
            sprites.push(new Sprite(
				images.get(ImageName.Weapons),
				i * RangedWeapon.SPRITE_WIDTH,
				0,
				RangedWeapon.SPRITE_WIDTH,
				RangedWeapon.SPRITE_HEIGHT,
			));
        }
        return sprites;
    }

    shoot(target){
        if(this.shotDelayRemaining <= 0){
            let direction = new Vector(target.x - this.owner.position.x, target.y - this.owner.position.y);
            direction.normalize();
            direction.scale(this.shotSpeed);

            this.owner.map.projectiles.push(new Projectile(new Vector(this.position.x, this.position.y),
            Projectile.DEFAULT_DIMENSIONS,
            direction,
            this));
            
            this.shotDelayRemaining = this.shotDelay;
        }
    }

    update(dt){
        this.shotDelayRemaining = Math.max(0, this.shotDelayRemaining - dt);
        this.position.x = this.owner.hitbox.position.x;
        this.position.y = this.owner.hitbox.position.y;

        this.stateMachine.update(dt);
    }

    render(){
        context.save();
        context.beginPath();
        context.moveTo(this.owner.position.x, this.owner.position.y);
        context.lineTo(mouse.position.x, mouse.position.y);
        context.closePath();
        context.stroke();
        context.restore();

        this.stateMachine.render();
    }
}