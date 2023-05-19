import { massiveRequire  } from ".";

export const getFromConfig = () => {
	return {
		resources: massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
		countdownDuration: 3,
		rounds: 10,
		rpsKey: "rps",
		rpsMap: {
			0: "rock",
			1: "paper",
			2: "scissors"
		}
	}
}

export const rpsData = {
	frames: {
		paper: {
			frame: { x: 0, y: 0, w: 768, h: 805 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 768, h: 805 },
			sourceSize: { w: 768, h: 805 }
		},
		rock: {
			frame: { x: 768, y: 0, w: 753, h: 774 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 753, h: 774 },
			sourceSize: { w: 753, h: 774 }
		},
		scissors: {
			frame: { x: 0, y: 805, w: 807, h: 774 },
			rotated: false,
			trimmed: false,
			spriteSourceSize: { x: 0, y: 0, w: 807, h: 774 },
			sourceSize: { w: 807, h: 774 }
		}
	},
	meta: {
		image: "../../sprites/rps.png",
		format:" RGBA8888",
		size: { w: 1521, h: 1579 },
		scale: 1,
	},
	animations: {
		rps: ["rock", "paper", "scissors"]
	}
}