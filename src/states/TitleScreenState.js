import State from "../../lib/State.js";
import PlayState from "./PlayState.js";

import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine } from "../../globals.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";
import HighScore from "../utils/HighScore.js";

export default class TitleScreenState extends State {
    constructor() {
        super();
        this.score = HighScore.getScore();
        console.log(this.score);
    }

    update(dt){
        if(keys.Enter) {
            keys.Enter = false;

            stateMachine.change(GameStateName.Play);
        }
    }

    render() {
        images.render(ImageName.TitleScreen, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "48px Joystix";
        context.fillText("Fungal Takeover", CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
        context.font = "24px Joystix";
        context.fillText(`You killed ${this.score} Enemies Last Run`, CANVAS_WIDTH/2, CANVAS_HEIGHT -120);
        context.fillText("Press Enter to Begin", CANVAS_WIDTH/2, CANVAS_HEIGHT -80);
    }

    exit(){
        context.textAlign = "start";
    }
}