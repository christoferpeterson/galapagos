const calculatePixelRatio = () => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d") as any;
	const dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
						ctx.mozBackingStorePixelRatio ||
						ctx.msBackingStorePixelRatio ||
						ctx.oBackingStorePixelRatio ||
						ctx.backingStorePixelRatio || 1;

	canvas.remove();
	return dpr / bsr;
}

export default calculatePixelRatio;