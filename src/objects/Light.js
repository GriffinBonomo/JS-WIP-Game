import { context } from "../../globals.js";
import Ray from "../../lib/Ray.js";
import Vector from "../../lib/Vector.js";

export default class Light {
    constructor(position, map, options = {}) {
        this.position = position;
        this.map = map;

        this.colour = options.colour ?? 'white';
        this.opacity = options.opacity ?? 1;
        this.compositeStyle = options.compositeStyle ?? 'overlay';
        this.rayLength = options.rayLength ?? 300;
        this.coneAngle = options.coneAngle ?? 0;
        this.coneWidth = options.coneWidth ?? 360;

        this.collisionPoints = [];
        this.calculateCollisionPoints();
    }

    // Uses DDA Algorithm
    // Sources: 
    // https://www.youtube.com/watch?v=NbSee-XM7WA&t=1529s (javidx9)
    // https://www.youtube.com/watch?v=W5P8GlaEOSI&t=1236s (Abdul Bari)
    calculateCollisionPoints(){
        this.collisionPoints = [];
        for(let a = this.coneAngle - (this.coneWidth / 2); a < this.coneAngle + (this.coneWidth / 2); a += 1){
            const radianAngle = (a * Math.PI) / 180;
            let rayDir = new Vector(Math.sin(radianAngle), Math.cos(radianAngle));

            const ray = new Ray(this.position, rayDir, this.rayLength);

            this.collisionPoints.push(this.map.rayCast(ray));
        }
    }

    update(dt){

    }

    render(){
        // Drawing light object
        context.fillStyle = 'red';
        context.fillRect(this.position.x -1, this.position.y -1, 3, 3);

        context.fillStyle = this.colour;
        /*
        const gradient = context.createRadialGradient(this.position.x, this.position.y, 50, this.position.x, this.position.y, this.rayLength);
        gradient.addColorStop(0, this.colour);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        
        context.fillStyle = gradient
        */
        context.save();
        context.globalAlpha = this.opacity;
        context.globalCompositeOperation = this.compositeStyle;
        context.beginPath();
        context.moveTo(this.position.x, this.position.y); 
        this.collisionPoints.forEach(point => {
            context.lineTo(point.x, point.y);
        });

        context.closePath();
        context.fill();
        context.restore();
    }
}