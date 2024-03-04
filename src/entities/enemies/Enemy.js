import Entity from "../Entity.js";

export default class Enemy extends Entity {
    constructor(sprites){
        super();

        this.sprites = sprites;
    }
}