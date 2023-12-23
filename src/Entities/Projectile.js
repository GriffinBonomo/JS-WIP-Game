import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";
import Entity from "./Entity.js";
import { isAABBCollision } from "../../lib/CollisionHelper.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";

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
        if(this.weapon.owner instanceof Player){
            this.map.enemies.forEach(enemy => {
                if(isAABBCollision(this.position.x, this.position.y,
                    this.dimensions.x, this.dimensions.y,
                    enemy.position.x, enemy.position.y,
                    enemy.dimensions.x, enemy.dimensions.y)){
                        enemy.takeDamage(this.damage);
                        this.isDead = true;
                    }
            })
        }
        else if(this.weapon.owner instanceof Enemy){
            if(isAABBCollision(this.position.x, this.position.y,
                this.dimensions.x, this.dimensions.y,
                this.map.player.position.x, this.map.player.position.y,
                this.map.player.dimensions.x, this.map.player.dimensions.x)){
                    player.takeDamage(this.damage);
                    this.isDead = true;
                }
        }
    }

    render(){
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    }
}