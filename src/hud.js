import {
    canvas,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "../globals.js";

export default class HUD {
    constructor(player, enableDebug = 0){
        this.fps = 0;
        this.player = player;
        this.enableDebug = enableDebug;
    }

    update(dt){
        this.fps = Math.round(1/dt);
    }

    render(){
        if(this.enableDebug == 1){
            context.fillStyle = "white";
            context.font = "16px Joystix"
            context.fillText(`X: ${Math.floor(this.player.position.x)}`, 10, 20);
            context.fillText(`Y: ${Math.floor(this.player.position.y)}`, 10, 40);
            context.fillText(`DX: ${this.player.velocity.x}`, 10, 60);
            context.fillText(`DY: ${this.player.velocity.y}`, 10, 80);
            context.fillText(`FPS: ${this.fps}`, 10, 100);
        }
    }
}