export default class Camera implements ICamera {
	x: number;
	y: number;

	constructor(x:number = 0, y:number = 0) {
		this.x = x;
		this.y = y;
	}

	move(x: any, y: any) {
		this.x += x;
		this.y += y;
	};
}