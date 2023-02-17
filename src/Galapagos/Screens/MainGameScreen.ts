import BaseScreen from "../../TranslucentGameEngine/Screens/BaseScreen"
import { Camera, Viewport } from "../../TranslucentGameEngine/View";
import { World } from "../../TranslucentGameEngine/World";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH, WORLD_DIMENSIONS_HEIGHT, WORLD_DIMENSIONS_WIDTH } from "../constants";
import MainCharacter from "../Entities/MainCharacter";
import { MainGameState } from "../types";

export default class MainGameScreen extends BaseScreen {
	frame: number;
	camera: ICamera;
	world: IWorld;
	viewport: IViewport;
	state: MainGameState;
	mainCharacter: MainCharacter;
	
	constructor() {
		super(0);

		this.camera = new Camera(0, 0);
		this.viewport = new Viewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
		this.world = new World(WORLD_DIMENSIONS_HEIGHT, WORLD_DIMENSIONS_WIDTH);
		this.frame = 0;
		this.state = {
			inputs: { movement: { active: false, holdGround: false } }
		};
		this.mainCharacter = new MainCharacter(0, 0);
		this.entities.push(this.mainCharacter);
	}

	public override update(state:IGameState): void {
		const gameState:GameState<MainGameState> = { ...state, game: this.state };

		state.camera = this.camera;
		state.viewport = this.viewport;
		state.world = this.world;

		super.update(gameState);
	}

	public override draw(ctx: CanvasRenderingContext2D, gameState:IGameState): void {
		this.frame = this.frame ?? 0;
		super.draw(ctx, gameState);
		this.frame++;
	}

	leftmousedown(e: MouseEvent){
		console.log("Left down!");
	}

	middlemousedown(e: MouseEvent){
		console.log("Middle down!");
	}

	rightmousedown(e: MouseEvent) {
		this.state.inputs.movement.active = true;
	}

	leftmouseup(e: MouseEvent){
		console.log("Left up!");
	}

	middlemouseup(e: MouseEvent){
		console.log("Middle up!");
	}

	rightmouseup(e: MouseEvent) {
		const { offsetX, offsetY } = e;
		this.state.inputs.movement.targetX = offsetX - this.viewport.w / 2 + this.camera.x;
		this.state.inputs.movement.targetY = -offsetY + this.viewport.h / 2 + this.camera.y;
		this.state.inputs.movement.active = false;
	}

	keydown(e: KeyboardEvent){
		const key = e.key.toLowerCase();
		switch(key) {
			case "shift":
				this.state.inputs.movement.holdGround = true
				break;
		}
	}

	keyup(e: KeyboardEvent){		
		const key = e.key.toLowerCase();
		switch(key) {
			case "shift":
				this.state.inputs.movement.holdGround = false
				break;
		}
	}

	mousemove(e: MouseEvent){
		if(this.state.inputs.movement.active) {
			const { offsetX, offsetY } = e;
			this.state.inputs.movement.targetX = offsetX - this.viewport.w / 2 + this.camera.x;
			this.state.inputs.movement.targetY = -offsetY + this.viewport.h / 2 + this.camera.y;
		}
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