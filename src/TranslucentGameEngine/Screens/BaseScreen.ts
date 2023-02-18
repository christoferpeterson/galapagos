export default abstract class BaseScreen implements IScreen {
	zIndex: number;
	entities: IEntity[]

	constructor(zIndex:number) {
		this.zIndex = zIndex;
		this.entities = [];
	}

	public update(state: IGameState) {
		let i = 0;
		const len = this.entities.length;
    while (i < len) {
			this.entities[i].update(state);
			i++
    }
	}

	public draw(ctx: CanvasRenderingContext2D, gameState:IGameState) {
		const entities = this.entities.sort((a,b) => b.zIndex - a.zIndex);
		let i = 0;
		const len = entities.length;
    while (i < len) {
			entities[i].draw(ctx, gameState);
			i++
    }
	}

}