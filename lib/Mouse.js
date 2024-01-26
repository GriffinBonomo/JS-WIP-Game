import Vector from "./Vector.js"

export default class Mouse {
    constructor(element){
        this.position = new Vector(0, 0);
        this.element = element;
        this.rect;
        this.buttons = {};
    }

    enable(){
        this.updateOffsets();

        this.element.addEventListener('mousemove', event => {
            this.position.x = event.clientX - this.rect.left;
            this.position.y = event.clientY - this.rect.top;
        });

        this.element.addEventListener('mousedown', event => {
            this.buttons[event.button] = true;
        });
        this.element.addEventListener('mouseup', event => {
            this.buttons[event.button] = false;
        });
    }

    // This exists because Javascript and its *LOVELY* DOM don't fully load before getBoudingClientRect is called 
    updateOffsets(){
        this.rect = this.element.getBoundingClientRect(); 
    }
}