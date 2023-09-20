export default class Player {
    constructor(x, y, height, width){
        this.x = x;
        this.y = y;

        this.dx = 0;
        this.dy = 0;

        this.height = height;
        this.width = width;

        this.moveSpeed = 100;
        this.maxSpeed = 500;
    }
    
    moveHorizontal(moveForward){
        if(moveForward){
            this.dx = Math.min(this.maxSpeed, this.dx+this.moveSpeed);
        }
        else{
            this.dx = Math.max(-this.maxSpeed, this.dx-this.moveSpeed);
        }
    }
    moveVertical(moveDownward){
        if(moveDownward){
            this.dy = Math.min(this.maxSpeed, this.dy+this.moveSpeed);
        }
        else{
            this.dy = Math.max(-this.maxSpeed, this.dy-this.moveSpeed);
        }
    }

    applyFriction(){
        let frictionCoefficient = 0.7;

        this.dx = Math.trunc(this.dx * frictionCoefficient);
        this.dy = Math.trunc(this.dy * frictionCoefficient);
    }

    update(dt){
        this.applyFriction();

        this.x += this.dx * dt;
        this.y += this.dy * dt;
    }
}