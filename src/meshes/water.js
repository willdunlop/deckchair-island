import constants from '../config/constants';
const { AMOUNTX, AMOUNTY, lightColor, waterColor } = constants;

export default function Water(lightPosition) {
  /** Water Geo and shader */
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000, AMOUNTX, AMOUNTY);
  const waterNormalMap = new THREE.TextureLoader().load(
      'assets/img/water-norms3.png',
      function(texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
  );
  const waterOptions = {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormalMap,
      alpha: 1.0,
      size: 8.6,
      sunDirection: lightPosition,
      sunColor: lightColor,
      waterColor: waterColor,
      distortionScale: 3.7,
      fog: false
  };

  return new THREE.Water(waterGeometry, waterOptions)
}
