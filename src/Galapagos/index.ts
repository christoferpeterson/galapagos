import TranslucentGameEngine from "../TranslucentGameEngine";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "./constants";
import MainGameScreen from "./Screens/MainGameScreen";

export class Galapagos extends TranslucentGameEngine {
	constructor() {
		super(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, new MainGameScreen());
	}
}