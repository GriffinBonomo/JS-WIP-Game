import Direction from "../../enums/Directions.js";
import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import Tile from "../../services/Tile.js";
import EnemyStateName from "../../enums/EnemyStateNames.js";

export default class EnemyChasingState extends State{
    constructor(enemy, animation){
        super();

        this.enemy = enemy;
        this.detectionScalar = 2;
        this.chasingPrecision = 1;

        this.animation = animation;
    }

    enter() {
        this.enemy.currentAnimation = this.animation;
    }

    update(dt){
        if((this.enemy.getPlayerDistance() / Tile.SIZE) < (this.enemy.detectionRange * this.detectionScalar)){
            let dx = this.enemy.position.x - this.enemy.map.player.position.x
            let dy = this.enemy.position.y - this.enemy.map.player.position.y

            if(dx < -this.chasingPrecision){
                this.enemy.move(Direction.Right);
            }
            else if(dx > this.chasingPrecision){
                this.enemy.move(Direction.Left);
            }

            if(dy < -this.chasingPrecision){
                this.enemy.move(Direction.Down);
            }
            else if(dy > this.chasingPrecision){
                this.enemy.move(Direction.Up);
            }

            if(this.enemy.getPlayerDistance() < Tile.SIZE){
                this.enemy.map.player.takeDamage(this.enemy.damage);
            }
        }
        else if(this.enemy.velocity.x == 0 && this.enemy.velocity.y == 0){
            this.enemy.changeState(EnemyStateName.Idle);
        }

        this.enemy.velocityAfterCollision(dt);
        this.enemy.applyFriction();


    }
}