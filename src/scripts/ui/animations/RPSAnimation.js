import { AnimatedSprite } from "pixi.js";

const rpsAnimation = (spritesheet, animationSpeed, canAnimate, alpha = 1) => {
  const pickSprite = new AnimatedSprite(spritesheet.animations.rps);
  pickSprite.animationSpeed = animationSpeed;
  pickSprite.alpha = alpha;
  pickSprite.play();
  pickSprite.visible = canAnimate;
  return pickSprite;
};

export default rpsAnimation;