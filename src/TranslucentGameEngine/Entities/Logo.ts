export default class LogOverlay implements IEntity {
	zIndex: number;
	constructor() {
		this.zIndex = Number.MAX_VALUE;
	}

	update(state:IGameState) {
		
	}

	draw(ctx: CanvasRenderingContext2D) {

	};
}