import EnemyStateName from "../../enums/EnemyStateNames.js";
import Animation from "../../../lib/Animation.js";
import Enemy from "../Enemy.js";

export default class Zombie extends Enemy {
    static ZOMBIE_SPRITES = [0,1,2,3,4];

    constructor(position, dimensions, map, sprites){
        super(position, dimensions, map, Zombie.generateEnemySprites(sprites));

        const animations = {
            [EnemyStateName.Idle]: new Animation([0], 1),
            [EnemyStateName.Chasing]: new Animation([1,2,3,4,3,2], 0.3)
        }
        this.stateMachine = this.initialiseStateMachine(animations);
    }

    static generateEnemySprites(sprites){
        let enemySprites = [];
        Zombie.ZOMBIE_SPRITES.forEach(spriteIndex => {
            enemySprites.push(sprites[spriteIndex]);
        });
        return enemySprites;
    }
}