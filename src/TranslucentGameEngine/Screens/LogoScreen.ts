import BaseScreen from "./BaseScreen";

export default class LogoScreen extends BaseScreen {
	frame?: number;
	nextScreen: IScreen;

	constructor(nextScreen:IScreen) {
		super(0);
		this.nextScreen = nextScreen;
	}

	public override update(state: IGameState): void {
		if(state.loadScreen)
			state.loadScreen(this.nextScreen);
		super.update(state);
	}

	public override draw(ctx: CanvasRenderingContext2D, gameState:IGameState): void {
		this.frame = this.frame ?? 0;
		super.draw(ctx, gameState);
		this.frame++;
	}

	leftmousedown(e: MouseEvent){
	}

	middlemousedown(e: MouseEvent){
	}

	rightmousedown(e: MouseEvent){
	}

	leftmouseup(e: MouseEvent){
	}

	middlemouseup(e: MouseEvent){
	}

	rightmouseup(e: MouseEvent){
	}

	keydown(e: KeyboardEvent){
		console.log(`${e.key.toLowerCase()} down`);
	}

	keyup(e: KeyboardEvent){
		console.log(`${e.key.toLowerCase()} up`);
	}

	mousemove(e: MouseEvent){

	}

	wheel(e:WheelEvent){
		if(e.deltaY < 0) {
			console.log("Wheel increment up");
		}
		if(e.deltaY > 0) {
			console.log("Wheel increment down");
		}
	}
}