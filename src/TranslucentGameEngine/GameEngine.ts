import LogOverlay from "./Entities/LogOverlay";
import UniversalBackground from "./Entities/UniversalBackground";
import LogoScreen from "./Screens/LogoScreen";
import { Inputs } from "./types/Inputs";
import buildCanvas from "./Utilities/buildCanvas";
import { Camera, Viewport } from "./View";

const TARGET_FPS = 60 as const;
const INTERVAL = 1000 / TARGET_FPS;

const unloadCallback = (event:any) => {
	event.preventDefault();
	event.returnValue = "";
	return "";
};

const defaultInputs:Inputs = {
	mouse: { x: 0, y: 0, lmb: false, mmb:false, rmb: false },
	keyboard: {},
	controls: {
		StandGround: "Shift",
		Move: "rmb"
	}
}

export default class GameEngine implements IGameEngine {
	private log: GameLog;
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	protected state: IGameState;
	private interval: Timer | null;
	private logOverlay?: LogOverlay;
	private firstScreen: IScreen;
	private height:number;
	private width:number;

	constructor(width:number, height: number, firstScreen:IScreen) {
		this.height = height;
		this.width = width;
		this.canvas = buildCanvas(width, height);
		this.canvas.focus();
		this.log = [];
		this.interval = null;
		this.firstScreen = firstScreen;
		const context = this.canvas.getContext("2d");

		if(context === null) {
			throw new Error("Unable to get canvas context.");
		}

		this.context = context;
		this.state = { 
			debug: false,
			fps: TARGET_FPS,
			loadScreen: (screen) => this.loadScreen(screen),
			inputs: defaultInputs,
			camera: new Camera(0,0),
			viewport: new Viewport(width, height)
		};

		this.initialize();
	}

	loadScreen(screen: IScreen) {
		this.state.screen = screen;
		this.state.screen.entities.push(new UniversalBackground());
	};

	private initialize() {
		this.loadScreen(new LogoScreen(this.firstScreen));
		
		// prevent navigation away from the page causing a loss of game progress
		// window.addEventListener("beforeunload", unloadCallback);
		this.canvas.addEventListener("mousedown", (e) => this.mousedown(e));
		this.canvas.addEventListener("mouseup", (e) => this.mouseup(e));
		this.canvas.addEventListener("keydown", (e) => this.keydown(e));
		this.canvas.addEventListener("keyup", (e) => this.keyup(e));
		this.canvas.addEventListener("mousemove", (e) => this.mousemove(e));
		this.canvas.addEventListener("wheel", (e) => this.wheel(e));

		// prevent right mouse click from opening context menu on the game's canvas
		this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
		this.interval = setInterval(() => this.loop(), INTERVAL);
	}

	private shutdown() {
		clearInterval(this.interval as Timer);
		window.removeEventListener("beforeunload", unloadCallback);
	}

	private loop() {
		this.update();
		this.draw();
	}

	private update() {
		if(this.state.debug && !this.logOverlay) {
			this.logOverlay = new LogOverlay(this.log);
		}
		this.state.screen?.update(this.state);
	}
	
	private draw() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.beginPath();
		this.logOverlay?.draw(this.context);
		this.state.screen?.draw(this.context, this.state);
	}

	private mousedown(e:MouseEvent) {
		switch(e.button) {
			case 0:
				this.state.inputs.mouse.lmb = true;
				break;
			case 1:
				this.state.inputs.mouse.mmb = true;
				break;
			case 2:
				this.state.inputs.mouse.rmb = true;
				break;
		}
	}

	private mouseup(e:MouseEvent) {

		switch(e.button) {
			case 0:
				this.state.inputs.mouse.lmb = false;
				break;
			case 1:
				this.state.inputs.mouse.mmb = false;
				break;
			case 2:
				this.state.inputs.mouse.rmb = false;
				break;
		}
	}

	private keydown(e:KeyboardEvent) {
		this.state.inputs.keyboard[e.key] = true;
	}

	private keyup(e:KeyboardEvent) {
		delete this.state.inputs.keyboard[e.key];		
	}

	private mousemove(e:MouseEvent) {
		this.state.inputs.mouse.x = e.offsetX - this.state.viewport.w / 2 + this.state.camera.x;
		this.state.inputs.mouse.y = -e.offsetY + this.state.viewport.h / 2 + this.state.camera.y;
	}

	private wheel(e:WheelEvent) {
		
	}
}