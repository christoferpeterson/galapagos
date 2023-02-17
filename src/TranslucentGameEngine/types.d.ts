export as namespace TranslucentGameEngine;

interface IGameState {
	debug: boolean,
	screen?: IScreen,
	camera?: ICamera,
	viewport?: IViewport,
	world?: IWorld,
	fps: number,
	loadScreen?: (screen:IScreen) => void
}

type GameState<T> = IGameState & {
	game:T
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
	entities: IEntity[],
	wheel: (e:WheelEvent) => void,
	mousemove: (e:MouseEvent) => void,
	keydown: (e:KeyboardEvent) => void,
	keyup: (e:KeyboardEvent) => void,
	rightmousedown: (e:MouseEvent) => void,
	leftmousedown: (e:MouseEvent) => void,
	middlemousedown: (e:MouseEvent) => void
	rightmouseup: (e:MouseEvent) => void,
	leftmouseup: (e:MouseEvent) => void,
	middlemouseup: (e:MouseEvent) => void
}

interface IGameEngine {
	loadScreen: (screen:IScreen) => void
}

interface ICamera {
	x: number,
	y: number,
	move: (x, y) => void
}

interface IViewport {
	h: number,
	w: number
}

interface IWorld {
	h: number,
	w: number
}