import { Container, Graphics } from "pixi.js";
import { buttonStyles, colors } from "../styles";
import { percent } from "../../utils";
import { startGame } from "../../state/effects";
import buttonComponent from "../components/Button";
import textComponent from "../components/Text";


const startScene = (width, height) => {

    const layoutWidth = width / 2;
    const layoutHeight = height / 2;

    const bgOverlay = new Graphics();
    bgOverlay.beginFill(colors.primaryBGColor);
	bgOverlay.drawRect(0,0, width, height);
	bgOverlay.endFill();

    bgOverlay.x = -layoutWidth;
	bgOverlay.y = -layoutHeight;

    const headingPosX = 0;
    const headingPosY = -(20 * layoutHeight / 100);
    const headingFontSize = 25 * layoutHeight / 100;
    const heading = textComponent('Rock, Paper, Scissors', headingPosX, headingPosY, headingFontSize);


    const btnStyle = buttonStyles(layoutWidth, layoutHeight);
    const buttonPosX = -btnStyle.width/2;
    const buttonPosY = percent(7, layoutHeight);
    const button = buttonComponent('Start Game', buttonPosX, buttonPosY, startGame, btnStyle);

    const container = new Container();
    container.x = layoutWidth;
    container.y = layoutHeight;
    container.addChild(bgOverlay, heading, button);
    return container;
};

export default startScene;