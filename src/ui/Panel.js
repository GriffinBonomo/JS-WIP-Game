import { roundedRectangle } from "../../lib/DrawingHelpers.js";
import { context } from "../../globals.js";
import Colour from "../enums/Colour.js";

export default class Panel {
	static DEFAULT_PADDING = 20;
	static BORDER_WIDTH = 10;

	/**
	 * A UI element that is simply a rectangle that
	 * other UI elements are placed on top of.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {object} options
	 */
	constructor(position, dimensions, options = {}) {
		this.position = position;
        this.dimensions = dimensions;

		this.borderColour = options.borderColour ?? Colour.Grey;
		this.panelColour = options.panelColour ?? Colour.White;
		this.padding = options.padding ?? Panel.DEFAULT_PADDING;
		this.borderWidth = options.width ?? Panel.BORDER_WIDTH;
		this.isVisible = true;
	}

	render() {
		if (!this.isVisible) {
			return;
		}

		context.save();
		this.renderBackground();
		this.renderForeground();
		context.restore();
	}

	renderBackground() {
		context.fillStyle = this.borderColour;
		roundedRectangle(
			context,
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y,
			this.borderWidth,
			true,
			false
		);
	}

	renderForeground() {
		context.fillStyle = this.panelColour;
		roundedRectangle(
			context,
			this.position.x + this.borderWidth / 2,
			this.position.y + this.borderWidth / 2,
			this.dimensions.x - this.borderWidth,
			this.dimensions.y - this.borderWidth,
			this.borderWidth,
			true,
			false
		);
	}

	toggle() {
		this.isVisible = !this.isVisible;
	}
}
