import Enemy from "./Enemy.js";

export default class Zombie extends Enemy{
    constructor(sprites){
        super(sprites);
        this.sprites = sprites;
    }
}