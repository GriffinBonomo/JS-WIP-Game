import Vector from "../../lib/Vector.js";
import Projectile from "../Entities/Projectile.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { context, images, mouse } from "../../globals.js";

export default class RangedWeapon {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 8;
    static TOTAL_SPRITES = 24

    constructor(owner, options = {}){
        this.owner = owner;

        this.shotDelay = 1 / (options.fireRate ?? 5);
        this.shotSpeed = options.shotSpeed ?? 500;

        this.shotDelayRemaining = 0;

        this.sprites = this.generateSprites();
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

            this.owner.map.projectiles.push(new Projectile(new Vector(this.owner.position.x, this.owner.position.y),
            Projectile.DEFAULT_DIMENSIONS,
            direction,
            this));
            
            this.shotDelayRemaining = this.shotDelay;
        }
    }

    update(dt){
        this.shotDelayRemaining = Math.max(0, this.shotDelayRemaining - dt);
    }

    render(){
        context.save();
        context.beginPath();
        context.moveTo(this.owner.position.x, this.owner.position.y);
        context.lineTo(mouse.position.x, mouse.position.y);
        context.closePath();
        context.stroke();
        context.restore();

        context.save();
        let dir = new Vector(mouse.position.x - this.owner.position.x, mouse.position.y - this.owner.position.y);
        dir.normalize();
        let angle = Math.atan2(dir.y, dir.x);
        context.translate(this.owner.position.x, this.owner.position.y - 10);
        context.rotate(angle);
        if(Math.abs(angle * (180 / Math.PI)) > 90){
			context.scale(1, -1);
        }
        this.sprites[0].render(0, -10);
        context.restore();
    }
}