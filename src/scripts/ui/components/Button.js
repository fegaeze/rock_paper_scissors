import { Graphics, Text } from "pixi.js";
import { buttonStyles } from "../styles";


const btnStyle = buttonStyles();

const buttonComponent = (
	text,
	x, 
	y,
	onPointertap,
	extraStyles = { ...btnStyle }
) => {
	const button = new Graphics();
	const buttonStyles = { ...btnStyle , ...extraStyles }
	const { color, width, height, fontSize, bgColor } = buttonStyles;
	const cornerRadius = 5;

	button.interactive = true;
	button.buttonMode = true;
	button.on("pointertap", onPointertap);

	button.beginFill(bgColor);
	button.drawRoundedRect(0, 0, width, height, cornerRadius);
	button.endFill();

	const buttonText = new Text(text, {
		fontSize,
		fill: color,
		align: "center",
	});
	buttonText.anchor.set(0.5);
	buttonText.x = width / 2;
	buttonText.y = height / 2;
	button.addChild(buttonText);

	button.x = x;
	button.y = y;

	return button;
};

export default buttonComponent;