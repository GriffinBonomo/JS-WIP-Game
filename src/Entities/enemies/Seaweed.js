import EnemyStateName from "../../enums/EnemyStateNames.js";
import Animation from "../../../lib/Animation.js";
import Enemy from "../Enemy.js";

export default class Seaweed extends Enemy {
    static SEAWEED_SPRITES = [0,1,2,3,4];

    constructor(position, dimensions, map, sprites){
        super(position, dimensions, map, Seaweed.generateEnemySprites(sprites));

        const animations = {
            [EnemyStateName.Idle]: new Animation([0], 1),
            [EnemyStateName.Chasing]: new Animation([1,2,3,4,3,2], 0.3)
        }
        this.stateMachine = this.initialiseStateMachine(animations);
    }

    static generateEnemySprites(sprites){
        let enemySprites = [];
        Seaweed.SEAWEED_SPRITES.forEach(spriteIndex => {
            enemySprites.push(sprites[spriteIndex]);
        });
        return enemySprites;
    }
}