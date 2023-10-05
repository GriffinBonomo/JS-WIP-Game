import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateNames.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    stateMachine
} from "../../globals.js";

export default class PlayState extends State {
    constructor() {
        super();
    }

    enter(parameters){
        this.level = parameters.level;
        this.player = parameters.player;
        // Change this later, HUD should be managed better
        this.hud = parameters.hud;
    }

    exit(){

    }

    update(dt){
        this.level.update(dt);
        this.player.update(dt);
        this.hud.update(dt);
    }

    render(){
        // Probably render HUD here instead of updating HUD in update func
        /*
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Set font configuration.
        context.font = '24px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        */
        this.level.render();
        this.player.render();
        this.player.projectiles.forEach(projectile => {
            projectile.render();
        });
        this.hud.render();
    }
}