import calculatePixelRatio from "./calculatePixelratio";

const buildCanvas = (width:number, height:number) => {
	const pixelRatio = calculatePixelRatio();
	const canvas = document.createElement("canvas");
	const gameWrapper = document.createElement("div");
	gameWrapper.appendChild(canvas);
	document.body.appendChild(gameWrapper);

	gameWrapper.style.width = "100%";
	gameWrapper.style.height = "100%";
	gameWrapper.style.position = "relative";
	gameWrapper.id = "gameWrapper";

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;
	canvas.style.margin = `30px auto`;
	canvas.style.top = "1vw";
	//canvas.style.bottom = "0";
	canvas.style.left = "0";
	canvas.style.right = "0";
	canvas.style.position = "absolute";
	canvas.tabIndex = 0;
	const context = canvas.getContext("2d");
	context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	return canvas;
}

export default buildCanvas;