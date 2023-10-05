//import Graphic from "../lib/Graphic";
//import Sprite from "../lib/Sprite";
import { images, context } from "../globals.js";

export default class Level {
    constructor() {
        this.background;
        // Todo: add level data here one day
    }

    update(dt){
        // Todo: probably do something here at some point
    }

    render() {
        images.render("gradientBackgroundColourful", 0, 0);
    }
}