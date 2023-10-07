import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "../globals.js";

export default class Projectile {
    constructor(x, y, dx, dy, height = 16, width = 16){

        this.x = x;
        this.y = y;

        this.dx = dx;
        this.dy = dy;

        this.height = height;
        this.width = width;

        this.cullable = false;

        this.colour = "red";
    }

    collision(){
        if(this.x + this.width < 0){
            this.x = CANVAS_WIDTH;
        }
        else if(this.x > CANVAS_WIDTH){
            this.x = 0;
        }
        
        if(this.y > CANVAS_HEIGHT){
            this.y = 0;
        }
        else if(this.y + this.height < 0){
            this.y = CANVAS_HEIGHT;
        }

        // Culling when off screen
        if((this.x + this.width < 0) || (this.x > CANVAS_WIDTH) || (this.y > CANVAS_HEIGHT) || (this.y + this.height < 0)){
            this.cullable = true;
        }
    }

    update(dt){
        this.x += this.dx * dt;
        this.y += this.dy * dt;

        this.collision();
    }

    render(){
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}