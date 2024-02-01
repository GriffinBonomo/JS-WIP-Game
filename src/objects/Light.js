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
        this.rayLength = options.rayLength ?? 400;
        this.coneAngle = options.coneAngle ?? 0;
        this.coneWidth = options.coneWidth ?? 360;

        this.collisionPoints = [];

        this.calculateCollisionPoints();
    }

    calculateCollisionPoints(){
        this.collisionPoints = [];
        const tileVector = new Vector(Tile.SIZE, Tile.SIZE);

        for(let a = this.coneAngle - (this.coneWidth / 2); a <= this.coneAngle + (this.coneWidth / 2); a += 1){
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
        }
    }

    update(dt){

    }

    render(){
        // Drawing light object
        context.fillStyle = 'red';
        context.fillRect(this.position.x -1, this.position.y -1, 3, 3);

        //context.fillStyle = this.colour;
        const gradient = context.createRadialGradient(this.position.x, this.position.y, 50, this.position.x, this.position.y, this.rayLength);
        gradient.addColorStop(0, this.colour);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        
        context.fillStyle = gradient
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