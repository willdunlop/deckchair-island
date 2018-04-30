import Tweens from './tweens';

const AnimateShape = {

  float: (shape, delay = 0, scene) => {
    let upScale = {x: 175, y: 175, z: 175 };
    let downScale = { x: 1, y: 1, z: 1 };
    let endTranslation = {x: shape.position.x, y: shape.position.y, z: 2000};
    shape.animation.upScale = Tweens.create(shape.scale, upScale, 1000, delay);
    shape.animation.translate = Tweens.create(shape.position, endTranslation, 30000);
    shape.animation.downScale = Tweens.create(shape.scale, downScale, 1000, () => {
      scene.remove(shape);
    });

    shape.animation.upScale.start();
    shape.animation.upScale.chain(shape.animation.translate);
    shape.animation.translate.chain(shape.animation.downScale)

  },

  beatPulse: () => {

  },

  removeTween: () => {

  },

}

export default AnimateShape;
