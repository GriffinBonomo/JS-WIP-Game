import Vector from "../../lib/Vector.js";

export default class Ray {
    constructor(position, direction, rayLength, tileLayer){
        this.position = position;
        this.direction = direction;
        this.rayLength = rayLength;
        this.tileLayer = tileLayer;

        this.didCollide = false;
    }

    /**
     * Casts a ray and detects the first tile collision using the DDA algorithm.
     * @returns The position of the first collision.
     */
    Cast(){
        const rayStepSize = new Vector(Math.sqrt(1 + Math.pow(this.direction.y / this.direction.x, 2)), Math.sqrt(1 + Math.pow(this.direction.x / this.direction.y, 2)));
        let currentPosition = new Vector(this.position.x, this.position.y);

        let currentRayLength = new Vector(); // Length from current position to nearest boundary
        let step = new Vector(Math.sign(this.direction.x), Math.sign(this.direction.y));
        if(this.direction.x < 0){
            currentRayLength.x = (this.position.x - currentPosition.x) * rayStepSize.x;
        }
        else {
            currentRayLength.x = (currentPosition.x + 1 - this.position.x) * rayStepSize.x;
        }
        if(this.direction.y < 0){
            currentRayLength.y = (this.position.y - currentPosition.y) * rayStepSize.y;
        }
        else {
            currentRayLength.y = (currentPosition.y + 1 - this.position.y) * rayStepSize.y;
        }

        let currentDistance = 0;
        while(!this.didCollide && currentDistance < this.rayLength){
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
            if(this.tileLayer.getTileAtPosition(currentPosition.x, currentPosition.y)){
                this.didCollide = true;
                break;
            }
        }
        return new Vector(currentPosition.x, currentPosition.y);
    }
}