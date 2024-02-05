import { context } from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";

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
            const rayStepSize = new Vector(Math.sqrt(1 + Math.pow(rayDir.y / rayDir.x, 2)), Math.sqrt(1 + Math.pow(rayDir.x / rayDir.y, 2)));
            let currentPosition = new Vector(this.position.x, this.position.y);

            let currentRayLength = new Vector(); // Length from current position to nearest boundary
            let step = new Vector(Math.sign(rayDir.x), Math.sign(rayDir.y));
            if(rayDir.x < 0){
                currentRayLength.x = (this.position.x - currentPosition.x) * rayStepSize.x;
            }
            else {
                currentRayLength.x = (currentPosition.x + 1 - this.position.x) * rayStepSize.x;
            }
            if(rayDir.y < 0){
                currentRayLength.y = (this.position.y - currentPosition.y) * rayStepSize.y;
            }
            else {
                currentRayLength.y = (currentPosition.y + 1 - this.position.y) * rayStepSize.y;
            }

            let currentDistance = 0;
            let didCollide = false
            while(!didCollide && currentDistance < this.rayLength){
                if(currentRayLength.x < currentRayLength.y){
                    currentPosition.x += step.x;
                    currentDistance = currentRayLength.x;
                    currentRayLength.x += rayStepSize.x;
                }
                else{
                    currentPosition.y += step.y;
                    currentDistance = currentRayLength.y;
                    currentRayLength.y += rayStepSize.y;
                }
                if(this.map.collisionLayer.getTile(Math.trunc(currentPosition.x / Tile.SIZE), Math.trunc(currentPosition.y / Tile.SIZE))){
                    didCollide = true;
                    break;
                }
            }
            this.collisionPoints.push(new Vector(currentPosition.x, currentPosition.y));
         
            /*
            const radianAngle = (a * Math.PI) / 180;

            const ray = new Vector(Math.sin(radianAngle), Math.cos(radianAngle));

            let currentPos = new Vector(this.position.x, this.position.y);

            let didCollide = false;

            for(let i = 0; i <= this.rayLength; i += Tile.SIZE){
                // calculate step
                currentPos.add(ray.multiply(tileVector));

                // naive approach
                if(this.map.collisionLayer.getTile(Math.trunc(currentPos.x / Tile.SIZE), Math.trunc(currentPos.y / Tile.SIZE))){
                    this.collisionPoints.push(new Vector(currentPos.x, currentPos.y));
                    didCollide = true;
                    break;
                }
            }
            if(!didCollide){
                this.collisionPoints.push(new Vector(currentPos.x, currentPos.y));
            }
            */
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