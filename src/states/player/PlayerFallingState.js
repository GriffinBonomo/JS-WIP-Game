import { keys } from "../../../globals.js";
import PlayerStateName from "../../enums/PlayerStateNames.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Vector from "../../../lib/Vector.js";
import Player from "../../entities/Player.js";

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
            this.player.changeState(PlayerStateName.Idle);
        }
        this.applyGravity(dt);
        this.player.velocityAfterCollision(dt);
    }

    applyGravity(dt){
        this.player.velocity.add(new Vector(0, PlayerFallingState.GRAVITY), dt);

        if(this.player.velocity.y > Player.MAX_FALLING_SPEED){
            this.player.velocity.y = Player.MAX_FALLING_SPEED;
        }
    }
}