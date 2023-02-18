import { Controls } from "../Controls";



export default class BaseEntity implements IEntity {
	zIndex: number;
	trajectory: Vector;
	position: Position;
	velocity: Vector;

	constructor(zIndex: number, position: Position) {
		this.zIndex = zIndex;
		this.trajectory = { magnitude: 0, angle: position.orientation };
		this.position = position;
		this.velocity = { magnitude: 0, angle: position.orientation };
	}

	protected controlActive(control:Controls, state:IGameState) {
		const boundKey = state.inputs.controls[control];
		return state.inputs.keyboard[boundKey] || state.inputs.mouse[boundKey];
	}

	update(state: any) {
		if(this.velocity.magnitude > 0) {
			const speed = this.velocity.magnitude;
			const angle = this.velocity.angle;
			this.position.x -= speed * Math.cos(angle) / state.fps;
			this.position.y += speed * Math.sin(angle) / state.fps;
			this.trajectory.magnitude -= speed/ state.fps;
			if(this.trajectory.magnitude <= 0) {
				this.velocity.magnitude = 0;
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D, state: any) {
		
	}
}