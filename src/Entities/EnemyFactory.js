import EnemyType from "../enums/EnemyType.js";
import Zombie from "../Entities/enemies/Zombie.js";

export default class EnemyFactory {
    static createInstance(type, position, dimensions, map, sprites) {
        switch(type){
            case EnemyType.Zombie:
                return new Zombie(position, dimensions, map, sprites);
        }
    }
}