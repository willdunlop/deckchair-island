import TWEEN from '@tweenjs/tween.js';

const Tweens = {

    create: (shapeProperty, endPosition, duration, delay = 0, whenCompleted = () => {}) => {
        return new TWEEN.Tween(shapeProperty)
            .to(endPosition, duration)
            .delay(delay)
            .onComplete(() => {
                
            });
      }

}

export default Tweens;