import { Container } from "pixi.js";
import { colors } from "../styles";
import { pickRPSChoice } from "../../state/effects";
import buttonComponent from "./Button";


const actionButtons = (x, y, isVisible, buttonStyles) => {
	const posX = x;
	const posY = y;

	const buttons = [
		{ buttonText: "Rock", pick: 0 },
		{ buttonText: "Paper", pick: 1 },
		{ buttonText: "Scissors", pick: 2 }
	];

	const buttonsContainer = buttons.map(({ buttonText, pick }, idx) => {
    	const handler = () => pickRPSChoice(pick);
		const buttonX = 0;
		const buttonY = idx * buttonStyles.margin;
		return buttonComponent(buttonText, buttonX, buttonY, handler, { ...buttonStyles,  bgColor: colors.altBtnColor});
	});

	const buttonContainer = new Container();
	buttonContainer.addChild(...buttonsContainer);
	buttonContainer.x = posX - (buttonContainer.width / 2);
	buttonContainer.y = posY - buttonContainer.height;
	buttonContainer.visible = isVisible
	return buttonContainer;
};

export default actionButtons