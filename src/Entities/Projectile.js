import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "../../globals.js";
import Vector from "../../lib/Vector.js";

export default class Projectile {
    static DEFAULT_DIMENSIONS = new Vector(16, 16);

    constructor(position, velocity, dimensions = Projectile.DEFAULT_DIMENSIONS){
        this.position = position;
        this.velocity = velocity;

        this.dimensions = dimensions

        this.cullable = false;

        this.colour = "red";
    }

    collision(){
        if(this.position.x + this.dimensions.x < 0){
            this.position.x = CANVAS_WIDTH;
        }
        else if(this.position.x > CANVAS_WIDTH){
            this.position.x = 0;
        }
        
        if(this.position.y > CANVAS_HEIGHT){
            this.position.y = 0;
        }
        else if(this.position.y + this.dimensions.y < 0){
            this.position.y = CANVAS_HEIGHT;
        }

        // Culling when off screen
        if((this.position.x + this.dimensions.x < 0) || 
            (this.position.x > CANVAS_WIDTH) || 
            (this.position.y > CANVAS_HEIGHT) || 
            (this.position.y + this.dimensions.y < 0)){
            this.cullable = true;
        }
    }

    update(dt){
        this.position.add(this.velocity, dt);
        this.collision();
    }

    render(){
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
    }
}