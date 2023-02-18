import { Controls } from "../../TranslucentGameEngine/Controls";
import BaseEntity from "../../TranslucentGameEngine/Entities/BaseEntity";

export default class MainCharacter extends BaseEntity {
	speed: number; // m/s
	size: number;
	color: string;
	outline: string;

	constructor(x:number, y:number) {
		super(0, { x, y, orientation: Math.PI/2 });
		this.speed = 250;
		this.size = 20;
		this.color = "blue";
		this.outline = "#000";
	}

	update(state:IGameState) {
		super.update(state);

		const { camera } = state;
		const { x: targetX = this.position.x, y: targetY = this.position.y } = state.inputs.mouse;

		if(this.controlActive(Controls.Move, state))
		{
			const holdGround = this.controlActive(Controls.StandGround, state);
			const deltaY = targetY - this.position.y;
			const deltaX = targetX - this.position.x;
			const angle = Math.atan2(deltaY, deltaX);
			const magnitude = holdGround ? 0 : deltaY / Math.sin(angle);
			this.trajectory = { magnitude, angle};
			this.velocity = { magnitude: holdGround ? 0 : this.speed, angle };
		}

		if(camera) {
			camera.x = this.position.x;
			camera.y = this.position.y;
		}
	}

	private drawMainCharacter(ctx:CanvasRenderingContext2D, x:number, y:number) {
		const height = this.size;
		const angle = this.trajectory.angle;
		const strokeColor = this.outline;
		const strokeWidth = 5;
		const fillColor = this.color;

		ctx.beginPath();
		ctx.moveTo(
			x + 5 / 3 * height * Math.cos(angle),
			y - 5 / 3 * height * Math.sin(angle)
		);
		ctx.lineTo(
			x - height * (2 / 3 * Math.cos(angle) + Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) - Math.cos(angle))
		);
	
		ctx.lineTo(
			x - height * (2 / 3 * Math.cos(angle) - Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) + Math.cos(angle))
		);
		ctx.closePath();
	
		if(!!strokeColor && !!strokeWidth) {
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = strokeWidth;
			ctx.stroke();
		}
	
		if(!!fillColor) {
			ctx.fillStyle = fillColor;
			ctx.fill();
		}
	}

	draw(ctx: CanvasRenderingContext2D, gameState:IGameState) {
		const x = 0;
		const y = 0;
		const originX = (gameState?.viewport?.w || 0) / 2;
		const originY = (gameState?.viewport?.h || 0) / 2;
		const offsetX = originX - this.size / 2;
		const offsetY = originY - this.size / 2;

		this.drawMainCharacter(ctx, x + offsetX, y + offsetY);
	};
}