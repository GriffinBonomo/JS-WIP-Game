import { keys, context } from "../../../globals.js";
import Vector from "../../../lib/Vector.js";
import State from "../../../lib/State.js";
import Direction from "../../enums/Directions.js";
import WeaponStateName from "../../enums/WeaponStateName.js";

export default class WeaponHolsteredState extends State {
    constructor(weapon, sprite){
        super();
        
        this.weapon = weapon;
        this.sprite = sprite;
    }

    enter(){
        // Maybe a holster animation should go here?

    }
    
    update(dt){
        if(keys.f){
            keys.f = false;
            this.weapon.stateMachine.change(WeaponStateName.Aiming);
        }
    }

    render(){
        context.save();
        context.translate(this.weapon.position.x, this.weapon.position.y);
        context.rotate(Math.PI / 2);
        if(this.weapon.owner.direction === Direction.Right){
            this.sprite.render(10, -7);
        }
        else {
            context.scale(1, -1);
            this.sprite.render(10, 0);
        }
        
        context.restore();
    }
}