export as namespace TranslucentGameEngine;

interface IGameState {
	debug: boolean,
	screen?: IScreen,
	camera: ICamera,
	viewport: IViewport,
	world?: IWorld,
	fps: number,
	loadScreen?: (screen:IScreen) => void
	inputs: Inputs
}

type Timer = ReturnType<typeof setInterval>;

type GameLog = [string,any][];

interface IUpdatable {
	update: (state:GameState) => void
}

interface IDrawable {
	zIndex: number,
	draw: (ctx:CanvasRenderingContext2D, state:GameState) => void
}

interface IEntity extends IUpdatable, IDrawable {

}

interface IScreen extends IEntity {
	entities: IEntity[]
}

interface IGameEngine {
	loadScreen: (screen:IScreen) => void
}

interface IWorld {
	h: number,
	w: number
}

interface IMoveable {
	move: () => void
}