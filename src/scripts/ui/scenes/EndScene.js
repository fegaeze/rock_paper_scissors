import { Container, Graphics } from "pixi.js";
import { buttonStyles, colors } from "../styles";
import { endGame, restartGame } from "../../state/effects";
import { percent } from "../../utils";
import buttonComponent from "../components/Button";
import textComponent from "../components/Text";


const endScene = (width, height, state) => {

    const layoutWidth = width / 2;
    const layoutHeight = height / 2;

    const bgOverlay = new Graphics();
    bgOverlay.beginFill(colors.primaryBGColor);
	bgOverlay.drawRect(0,0, width, height);
	bgOverlay.endFill();

    bgOverlay.x = -layoutWidth;
	bgOverlay.y = -layoutHeight;

    const headingPosX = 0;
    const headingPosY = -percent(25, layoutHeight);
    const headingFontSize = percent(30, layoutHeight);
    const heading = textComponent("Game Over", headingPosX, headingPosY, headingFontSize);

    const scoreFontSize = percent(8, layoutHeight);
    const scoreHeadingPosX = 0;
    const scoreHeadingPosY = 0;
    const scoreText = `${state.guest.name}: ${state.guest.score}  -  ${state.system.name}: ${state.system.score}`
    const scoreHeader = textComponent(scoreText, scoreHeadingPosX, scoreHeadingPosY, scoreFontSize);


    const btnStyle = buttonStyles(layoutWidth, layoutHeight);
    const btnPosY = percent(13, layoutHeight);

    const restartButtonX = 0;
    const restartButton = buttonComponent('Restart Game', restartButtonX, btnPosY, restartGame, btnStyle);

    const padding = percent(10, layoutHeight)
    const endButtonX = -btnStyle.width - padding;
    const endButton = buttonComponent('End Game', endButtonX , btnPosY, endGame, btnStyle);

    const container = new Container();
    container.x = layoutWidth;
    container.y = layoutHeight;
    container.addChild(bgOverlay, heading, scoreHeader, restartButton, endButton);
    return container;
};

export default endScene;