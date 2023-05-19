import { Application } from "pixi.js";
import { colors } from "./ui/styles";
import { gameService, machine } from "./state/machine";
import { getFromConfig, rpsData } from "./utils/config";
import { manageScene } from "./ui/scenes/SceneManager";
import { 
  persistState, 
  getScreenWidth,
  makeTextures, 
  preloadAssets, 
  resize, 
  updateLocalStorage, 
} from "./utils";


const { screenWidth, screenHeight } = getScreenWidth();

const app = new Application({ 
  view: document.querySelector("#pixi-canvas"),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  width: screenWidth,
  height: screenHeight,
  backgroundColor: colors.primaryBGColor
});

const { rpsKey, resources } = getFromConfig();
preloadAssets(app.loader, resources)
.then(assets => makeTextures(assets, rpsKey, rpsData))
.then(assets => {
  const previousState = updateLocalStorage(machine.initialState);
  gameService.start(previousState);
  gameService.onTransition((state) => { 
    manageScene(app, assets, state.context, state.value);
    persistState(state);
  });
})
.catch(err => {console.error(err)});

resize(app, screenWidth, screenHeight);
window.addEventListener('resize', () => {
  const { screenWidth, screenHeight } = getScreenWidth();
  resize(app, screenWidth, screenHeight);
});
