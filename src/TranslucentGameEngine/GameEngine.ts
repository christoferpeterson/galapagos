import LogOverlay from "./Entities/LogOverlay";
import UniversalBackground from "./Entities/UniversalBackground";
import LogoScreen from "./Screens/LogoScreen";
import buildCanvas from "./Utilities/buildCanvas";

const TARGET_FPS = 60 as const;
const INTERVAL = 1000 / TARGET_FPS;

const unloadCallback = (event:any) => {
	event.preventDefault();
	event.returnValue = "";
	return "";
};

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
			loadScreen: (screen) => this.loadScreen(screen)
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
				this.state.screen?.leftmousedown(e);
				break;
			case 1:
				this.state.screen?.middlemousedown(e);
				break;
			case 2:
				this.state.screen?.rightmousedown(e);
				break;
		}
	}

	private mouseup(e:MouseEvent) {

		switch(e.button) {
			case 0:
				this.state.screen?.leftmouseup(e);
				break;
			case 1:
				this.state.screen?.middlemouseup(e);
				break;
			case 2:
				this.state.screen?.rightmouseup(e);
				break;
		}
	}

	private keydown(e:KeyboardEvent) {
		this.state.screen?.keydown(e);
	}

	private keyup(e:KeyboardEvent) {
		this.state.screen?.keyup(e);
	}

	private mousemove(e:MouseEvent) {
		this.state.screen?.mousemove(e);
	}

	private wheel(e:WheelEvent) {
		this.state.screen?.wheel(e);
	}
}