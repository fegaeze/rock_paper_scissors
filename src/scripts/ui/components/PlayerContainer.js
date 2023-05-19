import { Container, Graphics, Sprite } from "pixi.js";
import { cardStyles } from "../styles";
import { getFromConfig } from "../../utils/config";
import { percent } from "../../utils";
import cardComponent from "./Card";
import rpsAnimation from "../animations/RPSAnimation";


const determinePickOption = (playerPick, isAnim, spriteWidth, spriteHeight, containerOffsetX, assets) => {
	const { rpsMap, rpsKey } = getFromConfig();

	const pickKey = rpsMap[playerPick];
	const resultSprite = playerPick === null ? new Sprite() : Sprite.from(assets[pickKey]);

	const animationSpeed = 0.06;
	const alpha = 0.3
	const animatedSprite = rpsAnimation(assets[rpsKey], animationSpeed, isAnim, alpha);
	const pickSprite = isAnim ? animatedSprite : resultSprite;
	pickSprite.width = spriteWidth;
	pickSprite.height = spriteHeight;
	pickSprite.x = -pickSprite.width/2 - containerOffsetX;
	pickSprite.y = -pickSprite.height/2;

	return pickSprite;
}

const playerContainer = (player, containerWidth, containerHeight, assets, bgColor, isGameStarted) => {
	const { score, name, pick } = player;

	const bgOverlay = new Graphics();
	bgOverlay.x = -containerWidth;
	bgOverlay.y = -containerHeight;
	bgOverlay.beginFill(bgColor, 0.7);
	bgOverlay.drawRect(0, 0,containerWidth, containerHeight*2);
	bgOverlay.endFill();

	const scoreCardStyle = cardStyles(containerWidth, containerHeight);
    const playerScoreCardX = -scoreCardStyle.width/2 - percent(50, containerWidth);
    const playerScoreCardY = -percent(90, containerHeight);
    const playerScoreCard = cardComponent(`${name}: ${score}`, playerScoreCardX, playerScoreCardY, scoreCardStyle);

	const spriteOffsetX = containerWidth / 2;
	const spriteWidth = Math.abs(containerWidth) / 2;
	const spriteHeight = spriteWidth;
	const pickSprite = determinePickOption(pick, isGameStarted, spriteWidth, spriteHeight, spriteOffsetX, assets);

	const container = new Container();
	container.addChild(bgOverlay, playerScoreCard, pickSprite);
	return container;
}

export default playerContainer;