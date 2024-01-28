export default class Vector {
	/**
	 * A simple vector class that can add two vectors together.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vector, dt = 1) {
		this.x += vector.x * dt;
		this.y += vector.y * dt;
	}

	scale(scale){
		this.x *= scale;
		this.y *= scale;
	}

	multiply(vector){
		return new Vector(this.x * vector.x, this.y * vector.y);``
	}

	normalize(){
		const magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		this.x /= magnitude;
		this.y /= magnitude;
	}
}
