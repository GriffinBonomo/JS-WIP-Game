import Direction from "../../enums/Directions.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import EnemyStateName from "../../enums/EnemyStateNames.js";

export default class PlayerWalkingState extends State{
    constructor(enemy){
        super();

        this.enemy = enemy;
        this.animation = new Animation([0,1,2,1], 0.3);
    }

    enter() {
        this.enemy.currentAnimation = this.animation;
    }

    update(dt){
        this.enemy.velocityAfterCollision(dt);
        this.enemy.applyFriction();

        if(this.enemy.velocity.x == 0 && this.enemy.velocity.y == 0){
            this.enemy.changeState(EnemyStateName.Idle);
        }
    }
}