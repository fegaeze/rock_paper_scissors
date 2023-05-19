import endScene from "./EndScene";
import gameScene from "./GameScene";
import startScene from "./StartScene";

export const manageScene = (app, assets, appState, stateValue) => {
    
    const width = app.view.width;
    const height = app.view.height;

    const startScreen = startScene(width, height);
    const gameScreen = gameScene(width, height, assets, appState)
    const endScreen = endScene(width, height, appState);
    
    app.stage.children.forEach(item => app.stage.removeChild(item));

    switch(stateValue) {
        case "gameLobby":
            app.stage.addChild(startScreen);
            break;
        case "gameCompleted":
            app.stage.addChild(endScreen);
            break;
        default:
            app.stage.addChild(gameScreen);
            break;
    }

}



export default manageScene;