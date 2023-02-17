export as namespace Galapagos;

export type Movement = {
	targetX?: number,
	targetY?: number,
	active: boolean,
	holdGround: boolean
}

export type Inputs = {
	movement: Movement
};

export type MainGameState = {
	inputs: Inputs
}