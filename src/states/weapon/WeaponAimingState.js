import { keys, context, mouse } from "../../../globals.js";
import Vector from "../../../lib/Vector.js";
import State from "../../../lib/State.js";
import Direction from "../../enums/Directions.js";
import WeaponStateName from "../../enums/WeaponStateName.js";

export default class WeaponAimingState extends State {
    constructor(weapon, sprite){
        super();

        this.weapon = weapon;
        this.position = new Vector(this.weapon.owner.hitbox.position.x, this.weapon.owner.hitbox.position.y);
        this.sprite = sprite;
    }

    enter(){
        // Maybe an unholster animation should go here?

    }
    
    update(dt){
        this.position.x = this.weapon.owner.hitbox.position.x;
        this.position.y = this.weapon.owner.hitbox.position.y;

        if(keys.f){
            keys.f = false;
            this.weapon.stateMachine.change(WeaponStateName.Holstered);
        }
    }

    render(){
        context.save();
        let dir = new Vector(mouse.position.x - this.position.x, mouse.position.y - this.position.y);
        dir.normalize();
        let angle = Math.atan2(dir.y, dir.x);
        context.translate(this.weapon.owner.position.x, this.weapon.owner.position.y - 10);
        context.rotate(angle);
        if(Math.abs(angle * (180 / Math.PI)) > 90){
			context.scale(1, -1);
        }
        this.sprite.render(0, 0);
        context.restore();
    }
    /*
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
        */
}