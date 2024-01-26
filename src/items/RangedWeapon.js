import Vector from "../../lib/Vector.js";
import Projectile from "../Entities/Projectile.js";

export default class RangedWeapon {
    constructor(owner, options = {}){
        this.owner = owner;

        this.shotDelay = 1 / (options.fireRate ?? 5);
        this.shotSpeed = options.shotSpeed ?? 500;

        this.shotDelayRemaining = 0;
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
}