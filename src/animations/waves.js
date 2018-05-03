/**
 * @function animateWater()
 * @param {Number} - A number for controlling the speed of the waves
 * WARNING: MORE MATHS ᕙ(⇀‸↼‶)ᕗ
 */
export default function Waves(water, wavesOptions, timestamp = 0) {
  const { seperation, waveWidth, waveHeight } = wavesOptions;

  timestamp /= 1000;
  var height = 50;

  for (let i = 0; i < water.geometry.vertices.length; i++) {
    const vertice = water.geometry.vertices[i]

    vertice.z = (Math.sin(timestamp + vertice.x) * waveHeight + (3 * Math.cos(timestamp + vertice.y)* seperation));

  }

    water.geometry.verticesNeedUpdate = true;
}
