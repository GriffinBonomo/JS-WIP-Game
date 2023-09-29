//import Graphic from "../lib/Graphic";
//import Sprite from "../lib/Sprite";
import { images } from "../globals.js";

export default class Level {
    constructor() {
        this.background;
        // Todo: add level data here one day
    }

    update(dt){
        // Todo: probably do something here at some point
        this.render();
    }

    render() {
        images.render("gradientBackgroundLight", 0, 0);
    }
}