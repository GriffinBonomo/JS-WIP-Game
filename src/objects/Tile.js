export default class Tile {
    static SIZE = 32;

    constructor(x, y, isCollidable = false) {
        this.x = x;
        this.y = y;
        this.isCollidable = isCollidable;
    }
    
    render(){
        // Render custom sprite here
    }
}