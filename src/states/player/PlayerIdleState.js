import { keys } from "../../../globals.js";
import Direction from "../../enums/Directions.js";
import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Player from "../../entities/Player.js";

export default class PlayerIdleState extends State{
    constructor(player){
        super();

        this.player = player;
        this.animation = new Animation([0,1,2,1], 0.3);
    }

    enter() {
        this.player.currentAnimation = this.animation;
    }

    update(dt){
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


        // Do directional collision checking here!
    }
}