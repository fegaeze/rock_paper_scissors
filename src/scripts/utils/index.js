import { Spritesheet } from "pixi.js";
import { State } from "xstate";


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getScreenWidth = () => {
  const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return { screenWidth,  screenHeight}
}

const makeTextures = (resources, sheetKey, sheetData) => {
  const promises = Object.entries(resources).map(([key, value]) => {
    if (key === sheetKey) {
      const sheet = new Spritesheet(resources[key].texture.baseTexture, sheetData);
      return sheet.parse().then(() => {
        const textures = Object.keys(sheet.textures).reduce((acc, frameName) => {
          acc[frameName] = sheet.textures[frameName];
          return acc;
        }, {});

        return { [key]: sheet, ...textures };
      });
    } else {
      const texture = value.texture;
      return Promise.resolve({ [key]: texture });
    }
  });
  return Promise.all(promises).then((results) => {
    return Object.assign({}, ...results);
  });
};

const massiveRequire = req => {
  return req.keys().map(key => (
    { 
      key, 
      data: req(key)
    }
  ))
}

const percent = (value, dimension) => {
  return value * dimension / 100;
}

const preloadAssets = (loader, assets) => {
  assets.forEach((asset) => {
    const { key, data } = asset;
    const assetName = key.substr(key.lastIndexOf('/') + 1).split(".")[0];
    const isImageAsset = key.indexOf(".png") !== -1 || key.indexOf(".jpg") !== -1;

    if (isImageAsset) {
      loader.add(assetName, data.default);
    }
  });

  return new Promise((resolve) => {
    loader.load((loader, resources) => {
      resolve(resources);
    });
  });
};

const persistState = state => {
  const jsonState = JSON.stringify(state);

  try {
    localStorage.setItem('app-state', jsonState);
  } catch (e) {
    console.error("Cannot add state to local Storage :(")
  }
}

const resize = (app, width, height) => {
  const aspectRatio = 16/9;
  const targetHeight = width / height > aspectRatio ? height : width / aspectRatio;
  const scale = Math.min(width / app.renderer.width, height / targetHeight);

  app.renderer.resize(width, targetHeight);
  app.stage.scale.set(scale);

  app.stage.children.forEach(child => {
    child.position.set(app.renderer.width / 2, app.renderer.height / 2);
  });
}

const updateLocalStorage = state => {
  const stateDefinition = JSON.parse(localStorage.getItem('app-state')) || state;
  return State.create(stateDefinition);
}

export { 
  getRandomInt, 
  getScreenWidth,
  makeTextures, 
  massiveRequire, 
  percent,
  persistState, 
  preloadAssets,
  resize,
  updateLocalStorage  
}