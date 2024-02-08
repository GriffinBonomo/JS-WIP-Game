import { keys, context, mouse } from "../../../globals.js";
import Vector from "../../../lib/Vector.js";
import State from "../../../lib/State.js";
import Direction from "../../enums/Directions.js";
import WeaponStateName from "../../enums/WeaponStateName.js";

export default class WeaponAimingState extends State {
    constructor(weapon, sprite){
        super();

        this.weapon = weapon;
        this.sprite = sprite;
    }

    enter(){
        // Maybe an unholster animation should go here?

    }
    
    update(dt){
        if(keys.f){
            keys.f = false;
            this.weapon.stateMachine.change(WeaponStateName.Holstered);
        }
    }

    render(){
        context.save();
        let dir = new Vector(mouse.position.x - this.weapon.position.x, mouse.position.y - this.weapon.position.y);

        let angle = Math.atan2(dir.y, dir.x);
        context.translate(this.weapon.position.x + this.weapon.owner.hitbox.dimensions.x/2, this.weapon.position.y + 5);
        context.rotate(angle);
        if(Math.abs(angle * (180 / Math.PI)) > 90){
			context.scale(1, -1);
        }
        this.sprite.render(0, 0);
        context.restore();
    }
}