const SQUARE_SIZE = 72; // pixels

export default class UniversalBackground implements IEntity {
	zIndex: number;
	x: number;
	y: number;
	rows: number;
	columns: number;

	constructor() {
		this.zIndex = Number.MIN_VALUE;
		this.rows = 0;
		this.x = 0;
		this.y = 0;
		this.columns = 0;
	}

	update(state:IGameState) {
		this.x = (state?.camera?.x || 0) % (SQUARE_SIZE * 2) - SQUARE_SIZE * 2.5;
		this.y = (state?.camera?.y || 0) % (SQUARE_SIZE * 2) - SQUARE_SIZE * 2.5;
		this.rows = (state?.viewport?.h || 0) / SQUARE_SIZE + 5;
		this.columns = (state?.viewport?.w || 0) / SQUARE_SIZE + 5;
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (var i = 0; i <= this.rows; ++i) {
			for (var j = 0, col = this.columns / 2; j <= col; ++j) {
				ctx.rect(2 * j * SQUARE_SIZE + (i % 2 ? 0 : SQUARE_SIZE) + this.x, i * SQUARE_SIZE + this.y, SQUARE_SIZE, SQUARE_SIZE);
			}
		}
		ctx.fillStyle = "#CCCCCC";
		ctx.fill();
	};
}