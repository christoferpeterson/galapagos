import { MainGameState, Movement } from "../types";

type Vector = {
	magnitude: number,
	angle: number
}

export default class MainCharacter implements IEntity {
	zIndex: number;
	x: number;
	y: number;
	speed: number; // m/s
	size: number;
	color: string;
	outline: string;
	trajectory: Vector;

	constructor(x:number, y:number) {
		this.zIndex = 0;
		this.x = x;
		this.y = y;
		this.speed = 250;
		this.size = 20;
		this.color = "blue";
		this.outline = "#000";
		this.trajectory = { magnitude: 0, angle: Math.PI/2 };
	}

	update(state:GameState<MainGameState>) {
		const { fps, camera } = state;
		const { targetX = this.x, targetY = this.y, holdGround = false } = state.game.inputs.movement;
		if(targetX && targetY)
		{
			const deltaY = targetY - this.y;
			const deltaX = targetX - this.x;
			const angle = Math.atan2(deltaY, deltaX);
			const magnitude = holdGround ? 0 : deltaY / Math.sin(angle);
			this.trajectory = { magnitude, angle}
			state.game.inputs.movement.targetX = 0;
			state.game.inputs.movement.targetY = 0;
		}

		if(this.trajectory.magnitude > 0) {
			this.x -= this.speed * Math.cos(this.trajectory.angle) / fps;
			this.y += this.speed * Math.sin(this.trajectory.angle) / fps;
			this.trajectory.magnitude -= this.speed/fps;
		}

		if(camera) {
			camera.x = this.x;
			camera.y = this.y;
		}
	}

	private drawMainCharacter(ctx:CanvasRenderingContext2D, x:number, y:number) {
		const height = this.size;
		const angle = this.trajectory.angle;
		const strokeColor = this.outline;
		const strokeWidth = 5;
		const fillColor = this.color;

		ctx.beginPath();
		ctx.moveTo( // nose of ship
			x + 5 / 3 * height * Math.cos(angle),
			y - 5 / 3 * height * Math.sin(angle)
		);
		ctx.lineTo( /// rear left
			x - height * (2 / 3 * Math.cos(angle) + Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) - Math.cos(angle))
		);
	
		ctx.lineTo( /// rear left
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