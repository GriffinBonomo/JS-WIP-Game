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
        this.render();
    }

    render(){
        if(this.enableDebug == 1){
            context.fillStyle = "black";
            context.fillText(`DX: ${this.player.dx}`, 75, 50);
            context.fillText(`DY: ${this.player.dy}`, 75, 100);
            context.fillText(`FPS: ${this.fps}`, 75, 150);
        }
    }
}