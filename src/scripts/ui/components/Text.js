import { Text } from "pixi.js";


const textComponent = (text, x, y, fontSize = 70, isVisible = true) => {
    const header = new Text(text, {
        fontSize,
        fill: 0xFFFFFF,
        align: "center",
        fontFamily: ['Henny Penny', 'cursive']
    });

    header.anchor.set(0.5);
    header.x = x;
    header.y = y;
    header.visible = isVisible;
    return header;
}

export default textComponent;