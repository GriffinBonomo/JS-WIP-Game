import State from "../../../lib/State.js";
import Map from "../../services/Map.js";

export default class PlayState extends State {
    constructor(mapDefinition) {
        super();

        this.mapDefinition = mapDefinition;
        this.map = new Map(mapDefinition);
    }

    enter(){
        this.map = new Map(this.mapDefinition);
    }

    update(dt){
        this.map.update(dt);
    }

    render(){
        this.map.render();
    }
}