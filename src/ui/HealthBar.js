import { roundedRectangle } from "../../lib/DrawingHelpers.js";
import { context } from "../../globals.js";
import Vector from "../../lib/Vector.js";
import Colour from "../enums/Colour.js";
import Panel from "./Panel.js";
import Tile from "../services/Tile.js";

export default class HealthBar extends Panel {
    static PLAYER_BAR_DIMENSIONS = new Vector(Tile.SIZE * 4, Tile.SIZE * 0.8);
    static ENEMY_BAR_DIMENSIONS = new Vector(Tile.SIZE * 4, Tile.SIZE * 0.8);

    constructor(entity, dimensions = HealthBar.ENEMY_BAR_DIMENSIONS){
        super(new Vector(entity.position.x, entity.position.y), dimensions, { borderColour: Colour.Black, width: 3});
  
        this.entity = entity;
        this.positionOffset = this.getBarOffset(entity);
        this.progress = 1;
    }

    getBarOffset(entity){
        let xOffset = -(this.dimensions.x - entity.dimensions.x)/2;
        let yOffset = -(this.dimensions.y + 5);
        return new Vector(xOffset, yOffset)
    }

    updatePosition(){
        this.position.x = this.entity.position.x + this.positionOffset.x;
        this.position.y = this.entity.position.y + this.positionOffset.y;
    }

    update(dt){
        this.progress = this.entity.currentHealth / this.entity.maxHealth;
        this.updatePosition();
    }

    render(){
        super.render();
        context.save();
        context.fillStyle = 'red';

        roundedRectangle(
			context,
			this.position.x + this.borderWidth / 2,
			this.position.y + this.borderWidth / 2,
			(this.dimensions.x - this.borderWidth) * this.progress,
			this.dimensions.y - this.borderWidth,
			this.borderWidth,
			true,
			false
		);

        context.restore();
    }
}