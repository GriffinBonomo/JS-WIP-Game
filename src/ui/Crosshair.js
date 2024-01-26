import { mouse, context } from "../../globals.js";
import Vector from "../../lib/Vector.js";

export default class Crosshair {
    constructor(){
        this.dimensions = new Vector(6,6);
    }

    update(){

    }

    render(){
        context.fillRect(Math.floor(mouse.position.x - this.dimensions.x / 2), Math.floor(mouse.position.y - this.dimensions.y / 2), this.dimensions.x, this.dimensions.y);
    }
}