import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { colors } from "../styles";


const roundCounter = (x, y, text, fontSize, radius) => {
    const bgColor = colors.tertiaryBGColor;
    const borderThickness = 5;

    const graphics = new Graphics();
    graphics.lineStyle(borderThickness, bgColor);
    graphics.drawCircle(0, 0, radius);
    
    graphics.x = x;
    graphics.y = y;
    
    const textStyle = new TextStyle({
        fontSize,
        fill: 0xFFFFFF,
        align: 'center',
    });
    
    const timerText = new Text(text, textStyle);
    timerText.anchor.set(0.5);
    timerText.x = x;
    timerText.y = y;
    
    const container = new Container();
    container.addChild(graphics, timerText);
    return container;
};

export default roundCounter;