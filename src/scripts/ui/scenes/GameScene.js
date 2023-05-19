import { Container, Sprite } from "pixi.js";
import { colors, buttonStyles, cardStyles } from "../styles";
import { percent } from "../../utils";
import actionButtons from "../components/ActionButtons";
import playerContainer from "../components/PlayerContainer";
import roundCounter from "../components/RoundCounter";
import textComponent from "../components/Text";
import cardComponent from "../components/Card";


const gameScene = (width, height, assets, state) => {

	const {
		guest,
		system, 
		rounds,
		actionBtnsVisible,
		noticeVisible,
		isGameStarted,
		countdownDuration,
		countdownStarted,
		winner
	} = state

	const containerHeight = height / 2;
	const containerWidth = width / 2;

	const background = Sprite.from(assets["bg"]);
	background.x = -containerWidth;
	background.y = -containerHeight;
	background.width = containerWidth *2;
	background.height = containerHeight*2;

	const { primaryBGColor, secondaryBGColor } = colors;
	const player1Container = playerContainer(system, containerWidth, containerHeight, assets, primaryBGColor, isGameStarted);
	const player2Container = playerContainer(guest, -containerWidth, containerHeight, assets, secondaryBGColor, isGameStarted);

	const btnStyles = buttonStyles(containerWidth, containerHeight);
	const actionButtonsPosX = 0;
	const actionButtonsPosY = percent(90, containerHeight);
	const actionButtonsComponent = actionButtons(actionButtonsPosX, actionButtonsPosY, actionBtnsVisible, btnStyles);

	const roundCounterFontSize = percent(6, containerHeight);
	const roundCounterRadius = percent(7, containerHeight);
	const roundCounterPosX = 0;
	const roundCounterPosY = -percent(90, containerHeight) + roundCounterRadius;
	const roundCounterComponent = roundCounter(roundCounterPosX, roundCounterPosY, rounds, roundCounterFontSize, roundCounterRadius);

	const cardStyle = cardStyles(containerWidth, containerHeight);
	const resultNoticePosX = -cardStyle.width/2;
	const resultNoticePosY = containerHeight - actionButtonsComponent.height;
	const resultNoticeText = winner !== null ? `${winner?.name.toUpperCase()} WIN!!!` : "It's a draw!!!";
	const resultNoticeComponent = cardComponent(resultNoticeText, resultNoticePosX, resultNoticePosY, cardStyle);
	resultNoticeComponent.visible = noticeVisible;

	const countdownFontSize = percent(25, containerHeight);
	const countdownPosX = 0;
	const countdownPosY = -percent(20, containerHeight);
	const countdownComponent = textComponent(
		countdownDuration, 
		countdownPosX, 
		countdownPosY, 
		countdownFontSize, 
		countdownStarted
	);

	const container = new Container();
	container.x =  containerWidth;
    container.y = containerHeight;
	container.addChild(
		background, 
		player1Container, 
		player2Container,
		roundCounterComponent, 
		actionButtonsComponent, 
		resultNoticeComponent,
		countdownComponent
	);
	return container;
};

export default gameScene;