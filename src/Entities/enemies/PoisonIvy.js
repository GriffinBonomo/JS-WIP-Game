import EnemyStateName from "../../enums/EnemyStateNames.js";
import Animation from "../../../lib/Animation.js";
import Enemy from "../Enemy.js";

export default class PoisonIvy extends Enemy {
    static POISON_IVY_SPRITES = [8,9,10,11,12];

    constructor(position, dimensions, map, sprites){
        super(position, dimensions, map, PoisonIvy.generateEnemySprites(sprites));

        const animations = {
            [EnemyStateName.Idle]: new Animation([0], 1),
            [EnemyStateName.Chasing]: new Animation([1,2,3,4,2], 0.3)
        }
        this.stateMachine = this.initialiseStateMachine(animations);
    }

    static generateEnemySprites(sprites){
        let enemySprites = [];
        PoisonIvy.POISON_IVY_SPRITES.forEach(spriteIndex => {
            enemySprites.push(sprites[spriteIndex]);
        });
        return enemySprites;
    }
}