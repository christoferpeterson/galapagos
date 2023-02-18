interface ICamera {
	x: number,
	y: number,
	move: (x, y) => void
}

interface IViewport {
	h: number,
	w: number
}