import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Vector from "../../../lib/Vector.js";

export default class PlayerJumpingState extends State{
    static JUMPFORCE = -175;

    constructor(player){
        super();

        this.player = player;
        this.animation = new Animation([0], 1, 1);
    }

    enter() {
        this.player.currentAnimation = this.animation;

        this.player.velocity.add(new Vector(0, PlayerJumpingState.JUMPFORCE));
    }

    update(dt){
        console.log(this.player.velocity.y);
        if(this.player.velocity.y > 0){
            this.player.changeState(PlayerStateName.Falling);
        }
        this.player.applyGravity(dt);
        this.player.velocityAfterCollision(dt);
    }
}