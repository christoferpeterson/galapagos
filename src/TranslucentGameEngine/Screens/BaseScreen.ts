export default abstract class BaseScreen implements IScreen {
	zIndex: number;
	entities: IEntity[]

	constructor(zIndex:number) {
		this.zIndex = zIndex;
		this.entities = [];
	}

	abstract leftmousedown(e: MouseEvent):void;
	abstract middlemousedown(e: MouseEvent):void;
	abstract rightmousedown(e: MouseEvent):void;
	abstract leftmouseup(e: MouseEvent):void;
	abstract middlemouseup(e: MouseEvent):void;
	abstract rightmouseup(e: MouseEvent):void;
	abstract keydown(e: KeyboardEvent):void;
	abstract keyup(e: KeyboardEvent):void;
	abstract mousemove(e: MouseEvent):void;
	abstract wheel(e: MouseEvent):void;

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