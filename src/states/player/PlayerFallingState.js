import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";

export default class PlayerFallingState extends State{
    static GRAVITY = 300;

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
        this.player.velocityAfterCollision(dt);
    }
}