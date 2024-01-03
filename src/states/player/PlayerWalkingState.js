import { keys } from "../../../globals.js";
import Direction from "../../enums/Directions.js";
import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";

export default class PlayerWalkingState extends State{
    constructor(player){
        super();

        this.player = player;
        this.animation = new Animation([0,1,2,3,4,5,6,7,8,9], 0.1);
    }

    enter() {
        this.player.currentAnimation = this.animation;
    }

    update(dt){
        if(keys.a){
            this.player.move(Direction.Left);
        }
        if(keys.d){
            this.player.move(Direction.Right);
        }
        if(keys.w){
            this.player.move(Direction.Up);
        }
        if(keys.s){
            this.player.move(Direction.Down);
        }
        
        this.player.velocityAfterCollision(dt);
        this.player.applyFriction();

        if(this.player.velocity.x == 0 && this.player.velocity.y == 0){
            this.player.changeState(PlayerStateName.Idle);
        }
    }
}