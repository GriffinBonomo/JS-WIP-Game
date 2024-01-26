import Vector from "./Vector.js"

export default class Mouse {
    constructor(element){
        this.position = new Vector(0, 0);
        this.element = element;
        this.rect = this.element.getBoundingClientRect(); 

        element.addEventListener('mousemove', event => {
            this.position.x = event.clientX - this.rect.left;
            this.position.y = event.clientY - this.rect.top;
        });
    }

    // This exists because Javascript and its *LOVELY* DOM don't fully load before getBoudingClientRect is called 
    updateOffset(){
        this.rect = this.element.getBoundingClientRect(); 
    }
}