export default class Viewport implements IViewport {
	w: number;
	h: number;

	constructor(width:number = 0, height:number = 0) {
		this.w = width;
		this.h = height;
	}
}