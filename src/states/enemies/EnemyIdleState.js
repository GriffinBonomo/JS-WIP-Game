import Direction from "../../enums/Directions.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Tile from "../../services/Tile.js";
import EnemyStateName from "../../enums/EnemyStateNames.js";

export default class EnemyIdleState extends State{
    constructor(enemy, animation){
        super();

        this.enemy = enemy;
        this.animation = animation;
    }

    enter() {
        this.enemy.currentAnimation = this.animation;
    }

    update(dt){
        if((this.enemy.getPlayerDistance() / Tile.SIZE) < this.enemy.detectionRange){
            this.enemy.stateMachine.change(EnemyStateName.Chasing)
        }
    }
}