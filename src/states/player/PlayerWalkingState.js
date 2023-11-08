import { keys } from "../../../globals.js";
import Direction from "../../enums/Directions.js";
import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Player from "../../entities/Player.js";

export default class PlayerWalkingState extends State{
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
            this.player.moveBackward();
        }
        if(keys.d){
            this.player.moveForward();
        }
        if(keys.w){
            this.player.moveUpward();
        }
        if(keys.s){
            this.player.moveDownward();
        }
        // Do directional collision checking here!

        this.player.collision();
        this.player.applyFriction();

        if(this.player.velocity.x == 0 && this.player.velocity.y == 0){
            this.player.changeState(PlayerStateName.Idle);
        }
    }
}