import BaseScreen from "../../TranslucentGameEngine/Screens/BaseScreen"
import MainCharacter from "../Entities/MainCharacter";

export default class MainGameScreen extends BaseScreen {
	frame: number;
	mainCharacter: MainCharacter;
	
	constructor() {
		super(0);
		this.frame = 0;
		this.mainCharacter = new MainCharacter(0, 0);
		this.entities.push(this.mainCharacter);
	}

	public override update(state:IGameState): void {
		super.update(state);
	}

	public override draw(ctx: CanvasRenderingContext2D, gameState:IGameState): void {
		this.frame = this.frame ?? 0;
		super.draw(ctx, gameState);
		this.frame++;
	}
}