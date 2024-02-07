import {
    context,
} from "../../globals.js"
import Hitbox from "../../lib/Hitbox.js";
import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";

export default class Entity {
    constructor(position, dimensions, velocity, map, options = {}) {
        this.position = position;
        this.lastValidPosition = new Vector(position.x, position.y);

        this.velocity = velocity;
        this.dimensions = dimensions;

        this.movementModifier = 1;
        
        this.hitboxOffsets = options.hitboxOffsets ?? new Hitbox();
        this.hitbox = new Hitbox(
            this.position.x + this.hitboxOffsets.position.x,
            this.position.y + this.hitboxOffsets.position.y,
            this.dimensions.x + this.hitboxOffsets.dimensions.x,
            this.dimensions.y + this.hitboxOffsets.dimensions.y,
        );
        this.currentHealth = options.maxHealth ?? 100;
        this.maxHealth = options.maxHealth ?? 100;
        this.damageCooldownLength = options.damageCooldownLength ?? 0.100;

        this.damageCooldownRemaining = 0;
        this.isDead = false;

        this.map = map;
        this.sprites = [];
        this.stateMachine = null;
    }

    changeState(state, parameters){
        this.stateMachine.change(state, parameters);
    }

    update(dt){
        this.damageCooldownRemaining = Math.max(0, this.damageCooldownRemaining - dt);

        if(this.currentHealth <= 0)
            this.isDead = true;

        // This is evil, remove it later!!!
        if(this.stateMachine){
            this.stateMachine.update(dt);
        }

        this.position.add(this.velocity, dt);

        this.hitbox.set(
            this.position.x + this.hitboxOffsets.position.x,
			this.position.y + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
        );

        // This is also evil, remove it later !!!
        if(this.currentAnimation){
            this.currentAnimation.update(dt);
        }
    }

    render(){
        if(this.velocity.x >= 0){
            this.sprites[this.currentAnimation.getCurrentFrame()].render(Math.floor(this.position.x), Math.floor(this.position.y));
        }
        else{
            context.save();
			context.translate(Math.floor(this.position.x) + this.dimensions.x, Math.floor(this.position.y));
			context.scale(-1, 1);
			this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
			context.restore();
        }

        //this.hitbox.render(context);
    }

    takeDamage(amount){
        if(this.damageCooldownRemaining > 0)
            return;

        this.currentHealth = Math.max(0, this.currentHealth - amount);
        this.damageCooldownRemaining = this.damageCooldownLength;
    }

    isTileColliding(){     
        // top
        for(let i = 0; i < this.hitbox.dimensions.x; i += Tile.SIZE){
            if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + i, this.hitbox.position.y))
                return true;
        }
        // bottom
        for(let i = 0; i < this.hitbox.dimensions.x; i += Tile.SIZE){
            if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + i, this.hitbox.position.y + this.hitbox.dimensions.y))
                return true; 
        }
        // bottom right
        if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + this.hitbox.dimensions.x, this.hitbox.position.y + this.hitbox.dimensions.y))
            return true;

        // left 
        for(let i = 0; i < this.hitbox.dimensions.y; i += Tile.SIZE){
            if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x, this.hitbox.position.y + i))
                return true; 
        }
        // right
        for(let i = 0; i < this.hitbox.dimensions.y; i += Tile.SIZE){
            if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + this.hitbox.dimensions.x, this.hitbox.position.y + i))
                return true; 
        }

        return false;
    }

    isStandingOnGround(){
        for(let i = 0; i < this.hitbox.dimensions.x; i += Tile.SIZE){
            if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + i, this.hitbox.position.y + this.hitbox.dimensions.y + 1))
                return true;
        }
        if(this.map.collisionLayer.getTileAtPosition(this.hitbox.position.x + this.hitbox.dimensions.x, this.hitbox.position.y + this.hitbox.dimensions.y + 1))
            return true;
        return false;
    }

    velocityAfterCollision(dt){
        const oldHitboxPosition = new Vector(this.hitbox.position.x, this.hitbox.position.y);

        // Handling horizontal collision
        this.hitbox.position.add(new Vector(this.velocity.x, 0), dt);

        if(this.isTileColliding()){
            this.velocity.x = 0;
            this.hitbox.position.x = oldHitboxPosition.x;
        }

        // Handle vertical collision
        this.hitbox.position.add(new Vector(0, this.velocity.y), dt);

        if(this.isTileColliding()){
            this.velocity.y = 0;
            this.hitbox.position.y = oldHitboxPosition.y;
        }
    }
}