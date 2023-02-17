export default class LogOverlay implements IEntity {
	zIndex: number;
	log: GameLog;
	element?:HTMLUListElement;
	lastCount?: number;
	constructor(log:GameLog) {
		this.zIndex = Number.MAX_VALUE;
		this.log = log;
	}

	createLogElement() {
		this.element = document.createElement("ul");
		document.getElementById("gameWrapper")?.appendChild(this.element);
		this.element.style.position = "absolute";
		this.element.style.color = "#666";
		this.element.style.top = "41vw";
		this.element.style.left = "0";
		this.element.style.right = "0";
		this.element.style.margin = "1vw";
		this.element.style.padding = "20px";
		this.element.style.border = "1px solid #666";
		this.element.style.listStyleType = "none";
		this.element.style.background = "#EEE";
	}

	update(state:IGameState) {
		if(!state.debug) {
			this.element?.remove();
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		if(!this.element) {
			this.createLogElement();
		}

		if(this.element && this.log.length !== this.lastCount) {
			this.lastCount = this.log.length;
			this.element.innerHTML = "";
			const logEntries = this.log.slice(Math.max(this.log.length - 5, 0)).reverse();
			logEntries.forEach(([message, details]) => {
				const li = document.createElement("li");
				li.innerText = message;
				this.element?.appendChild(li);
			});
		}
	};
}