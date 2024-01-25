import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import { keys } from "../../../globals.js"
import Direction from "../../enums/Directions.js";

export default class PlayerFallingState extends State{
    constructor(player){
        super();

        this.player = player;
        this.animation = new Animation([0], 1, 1);
    }

    enter() {
        this.player.currentAnimation = this.animation;
    }

    update(dt){
        if(this.player.isStandingOnGround()){
            this.player.changeState(PlayerStateName.Walking);
        }
        this.player.applyGravity(dt);

        if(keys.a){
            this.player.move(Direction.Left);
        }
        if(keys.d){
            this.player.move(Direction.Right);
        }

        this.player.velocityAfterCollision(dt);
    }
}