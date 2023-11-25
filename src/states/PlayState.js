import State from "../../lib/State.js";
import Map from "../services/Map.js";

export default class PlayState extends State {
    constructor(mapDefinition) {
        super();

        this.map = new Map(mapDefinition);
    }

    enter(parameters){

    }

    exit(){

    }

    update(dt){
        this.map.update(dt);
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
        this.map.render();
    }
}