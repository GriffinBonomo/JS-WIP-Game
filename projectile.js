import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "./globals.js";

export default class Projectile {
    constructor(x, y, dx, dy, height = 10, width = 10){
        this.x = x;
        this.y = y;
        // Dx and Dy allow the launcher to empart velocity onto the projectile
        this.dx = dx;
        this.dy = dy;

        this.height;
        this.width;

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
    }

    update(dt){
        this.x += this.dx * dt;
        this.y += this.dy * dt;

        this.render();
    }

    render(){
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}