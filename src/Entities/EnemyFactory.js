import EnemyType from "../enums/EnemyType.js";
import Seaweed from "../Entities/enemies/Seaweed.js";
import PoisonIvy from "./enemies/PoisonIvy.js";

export default class EnemyFactory {
    static createInstance(type, position, dimensions, map, sprites) {
        switch(type){
            case EnemyType.Seaweed:
                return new Seaweed(position, dimensions, map, sprites);
            case EnemyType.PoisonIvy:
                return new PoisonIvy(position, dimensions, map, sprites);
        }
    }
}