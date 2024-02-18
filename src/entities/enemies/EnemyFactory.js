import EnemyType from "../../enums/EnemyTypes.js";
import Zombie from "./Zombie.js";

export default class EnemyFactory {
    static create(type, sprites){
        switch(type){
            case EnemyType.Zombie:
                return new Zombie(sprites);
        }
    }
}