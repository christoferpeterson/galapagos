export default class World implements IWorld {
	h: number;
	w: number;

	constructor(width:number = 0, height:number = 0) {
		this.w = width;
		this.h = height;
	}
}