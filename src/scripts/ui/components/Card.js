import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { cardStyles } from "../styles";

const styles = cardStyles();

const cardComponent = (text, x, y, cardStyle = { ...styles }) => {
	
	const card = new Graphics();
	card.beginFill(cardStyle.bgColor, 0.5);
	card.drawRect(0, 0, cardStyle.width, cardStyle.height);
	card.endFill();

	const cardTextStyle = new TextStyle({...cardStyle});
	const cardText = new Text(text, cardTextStyle);
	cardText.anchor.set(0.5);
	cardText.x = card.width / 2 * -(x/Math.abs(x));
	cardText.y = card.height / 2;

	const container = new Container();
    container.x = x;
    container.y = y;
	container.addChild(card, cardText);
	return container;
};

export default cardComponent;