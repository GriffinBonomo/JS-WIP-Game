import { context } from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";

export default class Light {
    constructor(position, map) {
        this.position = position;
        this.map = map;

        this.rayLength = 200;

        this.rays = [];
        this.collisionPoints = [];

        this.calculateCollisionPoints();
    }

    calculateCollisionPoints(){
        const tileVector = new Vector(Tile.SIZE, Tile.SIZE);

        for(let a = 0; a < 360; a += 5){
            let radianAngle = (a * Math.PI) / 180;

            this.rays.push(new Vector(Math.sin(radianAngle), Math.cos(radianAngle)));
        }

        this.rays.forEach(ray => {
            const signVector = new Vector(Math.sign(ray.x), Math.sign(ray.y));
            const f = x => (ray.y / ray.x) * (x - this.position.x) + this.position.y;
            const g = y => (ray.x / ray.y) * (y - this.position.y) + this.position.x;

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
        });
    }

    update(dt){

    }

    render(){
        context.fillStyle = 'yellow';
        context.fillRect(this.position.x - Tile.SIZE/2, this.position.y - Tile.SIZE/2, Tile.SIZE, Tile.SIZE);
        context.fillStyle = 'white';

        context.save();
        context.globalAlpha = 0.4;
        context.beginPath();
        context.moveTo(this.collisionPoints[0].x, this.collisionPoints[0].y);

        for(let i = 1; i < this.collisionPoints.length; i++){
            context.lineTo(this.collisionPoints[i].x, this.collisionPoints[i].y);
        }
        /*
        this.collisionPoints.forEach(point => {
            context.lineTo(point.x, point.y);
        });
        */
        context.closePath();
        context.fill();
        context.restore();
    }
}