import { Controls } from "../Controls";

type ControlMap = {
	[key in Controls]: string
}

type Inputs = {
	mouse: { x: number, y:number, lmb:boolean, mmb: boolean, rmb: boolean };
	keyboard: { [k:string]: boolean },
	controls: ControlMap
};