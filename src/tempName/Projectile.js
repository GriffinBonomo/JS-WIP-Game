import {
    context,
} from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";
import Entity from "./Entity.js";

export default class Projectile extends Entity{
    static DEFAULT_DIMENSIONS = new Vector(Tile.SIZE, Tile.SIZE);

    constructor(position, dimensions, velocity, weapon){
        super(position, dimensions, velocity, weapon.owner.map);

        this.weapon = weapon;

        this.damage = 10;

        this.colour = "red";
    }

    update(dt){
        this.position.add(this.velocity, dt);
        if(this.getCollisionTiles().length > 0){
            this.isDead = true;
        }
    }

    render(){
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    }
}