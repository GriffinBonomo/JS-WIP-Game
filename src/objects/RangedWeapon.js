import Vector from "../../lib/Vector.js";
import Projectile from "../Entities/Projectile.js";
import Direction from "../enums/Directions.js";

export default class RangedWeapon {
    constructor(owner, options = {}){
        this.owner = owner;

        this.shotDelay = 1 / (options.fireRate ?? 5);
        this.shotSpeed = options.shotSpeed ?? 300;

        this.shotDelayRemaining = 0;
    }

    shoot(direction){
        if(this.shotDelayRemaining <= 0){
            switch(direction){
                case Direction.Left:
                    this.owner.map.projectiles.push(new Projectile(new Vector(this.owner.position.x, this.owner.position.y), Projectile.DEFAULT_DIMENSIONS, new Vector(-this.shotSpeed, 0), this));
                    break;
                case Direction.Right:
                    this.owner.map.projectiles.push(new Projectile(new Vector(this.owner.position.x, this.owner.position.y), Projectile.DEFAULT_DIMENSIONS, new Vector(this.shotSpeed, 0), this));
                    break;
                case Direction.Up:
                    this.owner.map.projectiles.push(new Projectile(new Vector(this.owner.position.x, this.owner.position.y), Projectile.DEFAULT_DIMENSIONS, new Vector(0, -this.shotSpeed), this));
                    break;
                case Direction.Down:
                    this.owner.map.projectiles.push(new Projectile(new Vector(this.owner.position.x, this.owner.position.y), Projectile.DEFAULT_DIMENSIONS, new Vector(0, this.shotSpeed), this));
                    break;
            }
            this.shotDelayRemaining = this.shotDelay;
        }
    }

    update(dt){
        this.shotDelayRemaining = Math.max(0, this.shotDelayRemaining - dt);
    }
}