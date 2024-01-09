import { keys } from "../../../globals.js";
import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";

export default class PlayerIdleState extends State{
    constructor(player){
        super();

        this.player = player;
        this.animation = new Animation([0], 1, 1);
    }

    enter() {
        this.player.currentAnimation = this.animation;
    }

    update(dt){
        this.player.velocityAfterCollision();
        if(!this.player.isStandingOnGround()){
            this.player.changeState(PlayerStateName.Falling);
        }

        if(keys.a){
            this.player.changeState(PlayerStateName.Walking);
        }
        if(keys.d){
            this.player.changeState(PlayerStateName.Walking);
        }
        if(keys.w){
            this.player.changeState(PlayerStateName.Walking);
        }
        if(keys.s){
            this.player.changeState(PlayerStateName.Walking);
        }
    }
}